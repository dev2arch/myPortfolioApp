# AWS Deployment Guide for Dewanshu's Portfolio Website

## Complete Step-by-Step Guide to Deploy Frontend and Backend on AWS

---

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Architecture Overview](#architecture-overview)
3. [Backend Deployment (EC2 + MongoDB)](#backend-deployment)
4. [Frontend Deployment (S3 + CloudFront)](#frontend-deployment)
5. [Database Setup](#database-setup)
6. [Domain & SSL Configuration](#domain-ssl-configuration)
7. [Environment Variables & Security](#environment-variables-security)
8. [Monitoring & Logging](#monitoring-logging)
9. [Cost Optimization](#cost-optimization)
10. [Troubleshooting](#troubleshooting)

---

## Prerequisites

### Required Tools
- AWS CLI installed and configured
- AWS Account with appropriate permissions
- Domain name (optional but recommended)
- Git repository access

### AWS Services We'll Use
- **EC2** - Backend server hosting
- **S3** - Frontend static website hosting
- **CloudFront** - Content delivery network
- **Route 53** - Domain management
- **Certificate Manager** - SSL certificates
- **MongoDB Atlas** - Database (or EC2 for self-hosted)
- **Application Load Balancer** - Load balancing
- **CloudWatch** - Monitoring and logging
- **IAM** - Security and permissions

---

## Architecture Overview

```
Internet → Route 53 → CloudFront → S3 (Frontend)
                          ↓
                    Application Load Balancer → EC2 (Backend) → MongoDB
```

### Cost Estimate (Monthly)
- **EC2 t3.micro**: $8.50
- **S3**: $1-5 (depending on usage)
- **CloudFront**: $1-10 (depending on traffic)
- **Route 53**: $0.50 per hosted zone
- **Total Estimated**: $15-30/month

---

## Backend Deployment (EC2 + MongoDB)

### Step 1: Launch EC2 Instance

1. **Login to AWS Console**
   - Navigate to EC2 Dashboard
   - Click "Launch Instance"

2. **Configure Instance**
   ```
   Name: portfolio-backend
   AMI: Ubuntu Server 22.04 LTS
   Instance Type: t3.micro (free tier eligible)
   Key Pair: Create new or select existing
   ```

3. **Security Group Settings**
   ```
   Type: SSH, Port: 22, Source: Your IP
   Type: HTTP, Port: 80, Source: 0.0.0.0/0
   Type: HTTPS, Port: 443, Source: 0.0.0.0/0
   Type: Custom TCP, Port: 8001, Source: 0.0.0.0/0
   ```

4. **Storage Configuration**
   ```
   Root Volume: 20 GB gp3
   ```

### Step 2: Connect to EC2 Instance

```bash
# Connect via SSH
ssh -i "your-key.pem" ubuntu@your-ec2-public-ip

# Update system
sudo apt update && sudo apt upgrade -y
```

### Step 3: Install Required Software

```bash
# Install Node.js 18
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install Python 3.11 and pip
sudo apt install python3.11 python3.11-pip python3.11-venv -y

# Install MongoDB
wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list
sudo apt-get update
sudo apt-get install -y mongodb-org

# Start MongoDB
sudo systemctl start mongod
sudo systemctl enable mongod

# Install PM2 for process management
sudo npm install -g pm2

# Install Nginx
sudo apt install nginx -y
sudo systemctl start nginx
sudo systemctl enable nginx
```

### Step 4: Deploy Backend Code

```bash
# Create application directory
sudo mkdir -p /var/www/portfolio-backend
sudo chown ubuntu:ubuntu /var/www/portfolio-backend

# Clone or upload your backend code
cd /var/www/portfolio-backend
# Upload your backend files here (server.py, requirements.txt, etc.)

# Create virtual environment
python3.11 -m venv venv
source venv/bin/activate

# Install Python dependencies
pip install -r requirements.txt

# Create environment file
cat > .env << EOF
MONGO_URL=mongodb://localhost:27017/portfolio_db
DB_NAME=portfolio_db
NODE_ENV=production
PORT=8001
EOF
```

### Step 5: Configure PM2 for Backend

```bash
# Create PM2 ecosystem file
cat > ecosystem.config.js << EOF
module.exports = {
  apps: [{
    name: 'portfolio-backend',
    script: 'python3.11',
    args: ['-m', 'uvicorn', 'server:app', '--host', '0.0.0.0', '--port', '8001'],
    cwd: '/var/www/portfolio-backend',
    instances: 1,
    exec_mode: 'fork',
    env: {
      NODE_ENV: 'production',
      MONGO_URL: 'mongodb://localhost:27017/portfolio_db',
      DB_NAME: 'portfolio_db'
    }
  }]
};
EOF

# Start application with PM2
pm2 start ecosystem.config.js
pm2 startup
pm2 save
```

### Step 6: Configure Nginx Reverse Proxy

```bash
# Create Nginx configuration
sudo cat > /etc/nginx/sites-available/portfolio-backend << EOF
server {
    listen 80;
    server_name your-domain.com;  # Replace with your domain

    location /api {
        proxy_pass http://localhost:8001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;
    }
}
EOF

# Enable site
sudo ln -s /etc/nginx/sites-available/portfolio-backend /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

---

## Frontend Deployment (S3 + CloudFront)

### Step 1: Build Frontend for Production

```bash
# On your local machine, in the frontend directory
cd /path/to/your/frontend

# Update environment variables
echo "REACT_APP_BACKEND_URL=https://your-api-domain.com" > .env.production

# Build for production
npm run build

# This creates a 'build' folder with optimized files
```

### Step 2: Create S3 Bucket for Static Website

1. **Create S3 Bucket**
   ```bash
   aws s3 mb s3://your-portfolio-bucket-name --region us-east-1
   ```

2. **Configure Bucket for Static Website Hosting**
   ```bash
   aws s3 website s3://your-portfolio-bucket-name --index-document index.html --error-document error.html
   ```

3. **Upload Build Files**
   ```bash
   cd build
   aws s3 sync . s3://your-portfolio-bucket-name --delete
   ```

4. **Set Bucket Policy for Public Access**
   ```json
   {
     "Version": "2012-10-17",
     "Statement": [
       {
         "Sid": "PublicReadGetObject",
         "Effect": "Allow",
         "Principal": "*",
         "Action": "s3:GetObject",
         "Resource": "arn:aws:s3:::your-portfolio-bucket-name/*"
       }
     ]
   }
   ```

### Step 3: Configure CloudFront Distribution

1. **Create CloudFront Distribution**
   - Origin Domain: your-portfolio-bucket-name.s3.amazonaws.com
   - Origin Path: (leave empty)
   - Viewer Protocol Policy: Redirect HTTP to HTTPS
   - Allowed HTTP Methods: GET, HEAD
   - Cache Policy: Caching Optimized
   - Compress Objects Automatically: Yes

2. **Configure Error Pages**
   ```
   Error Code: 403
   Response Page Path: /index.html
   HTTP Response Code: 200
   
   Error Code: 404
   Response Page Path: /index.html
   HTTP Response Code: 200
   ```

3. **Custom Domain Configuration**
   - Add your domain to "Alternate Domain Names"
   - Select SSL Certificate (request from ACM)

---

## Database Setup

### Option 1: MongoDB on EC2 (Already done above)

### Option 2: MongoDB Atlas (Recommended for Production)

1. **Create MongoDB Atlas Account**
   - Visit mongodb.com/cloud/atlas
   - Create free tier cluster

2. **Configure Database**
   ```
   Cluster Name: portfolio-cluster
   Provider: AWS
   Region: us-east-1
   Tier: M0 (Free)
   ```

3. **Setup Database User**
   ```
   Username: portfolio-user
   Password: Generate secure password
   ```

4. **Update Backend Environment**
   ```bash
   # Update .env file on EC2
   MONGO_URL=mongodb+srv://portfolio-user:password@portfolio-cluster.xxxxx.mongodb.net/portfolio_db
   ```

---

## Domain & SSL Configuration

### Step 1: Configure Route 53

1. **Create Hosted Zone**
   - Domain: your-domain.com
   - Note the name servers

2. **Create DNS Records**
   ```
   Type: A, Name: @, Value: CloudFront Distribution
   Type: A, Name: api, Value: EC2 Elastic IP
   Type: CNAME, Name: www, Value: your-domain.com
   ```

### Step 2: Request SSL Certificates

1. **For Frontend (CloudFront)**
   - Go to AWS Certificate Manager (us-east-1)
   - Request certificate for your-domain.com and www.your-domain.com
   - Validate via DNS

2. **For Backend (EC2)**
   ```bash
   # Install Certbot
   sudo snap install core; sudo snap refresh core
   sudo snap install --classic certbot
   sudo ln -s /snap/bin/certbot /usr/bin/certbot

   # Get SSL certificate
   sudo certbot --nginx -d api.your-domain.com
   ```

---

## Environment Variables & Security

### Backend Environment Variables

```bash
# /var/www/portfolio-backend/.env
MONGO_URL=mongodb://localhost:27017/portfolio_db
DB_NAME=portfolio_db
NODE_ENV=production
PORT=8001
CORS_ORIGINS=https://your-domain.com,https://www.your-domain.com
```

### Frontend Environment Variables

```bash
# .env.production
REACT_APP_BACKEND_URL=https://api.your-domain.com
```

### Security Best Practices

1. **EC2 Security Groups**
   ```
   SSH: Only from your IP
   HTTP/HTTPS: From everywhere
   Backend Port: Only from Load Balancer
   ```

2. **IAM Policies**
   - Create minimal IAM roles
   - Use IAM roles for EC2 instances
   - Avoid hardcoded credentials

3. **MongoDB Security**
   ```bash
   # Create admin user
   mongosh
   use admin
   db.createUser({
     user: "admin",
     pwd: "secure_password",
     roles: [ { role: "userAdminAnyDatabase", db: "admin" } ]
   })

   # Enable authentication
   sudo nano /etc/mongod.conf
   # Add: security:\n  authorization: enabled
   sudo systemctl restart mongod
   ```

---

## Monitoring & Logging

### CloudWatch Setup

1. **EC2 Monitoring**
   ```bash
   # Install CloudWatch agent
   wget https://s3.amazonaws.com/amazoncloudwatch-agent/ubuntu/amd64/latest/amazon-cloudwatch-agent.deb
   sudo dpkg -i -E ./amazon-cloudwatch-agent.deb
   ```

2. **Application Logs**
   ```bash
   # Configure PM2 logs
   pm2 install pm2-cloudwatch
   pm2 set pm2-cloudwatch:access_key_id your-access-key
   pm2 set pm2-cloudwatch:secret_access_key your-secret-key
   pm2 set pm2-cloudwatch:region us-east-1
   ```

### Log Rotation

```bash
# Configure logrotate
sudo cat > /etc/logrotate.d/portfolio << EOF
/var/log/portfolio/*.log {
    daily
    missingok
    rotate 7
    compress
    delaycompress
    copytruncate
}
EOF
```

---

## Cost Optimization

### EC2 Cost Optimization

1. **Use Reserved Instances**
   - Save up to 75% for long-term usage
   - 1-year term recommended

2. **Right-size Instances**
   - Monitor CPU/Memory usage
   - Upgrade/downgrade as needed

3. **Elastic IP**
   - Use only when necessary
   - Release unused IPs

### S3 Cost Optimization

1. **Lifecycle Policies**
   ```json
   {
     "Rules": [{
       "Status": "Enabled",
       "Filter": {"Prefix": "logs/"},
       "Transitions": [{
         "Days": 30,
         "StorageClass": "STANDARD_IA"
       }]
     }]
   }
   ```

2. **Enable Compression**
   - Gzip compression in CloudFront
   - Reduces bandwidth costs

---

## Troubleshooting

### Common Issues

1. **Backend Not Starting**
   ```bash
   # Check logs
   pm2 logs
   
   # Check MongoDB status
   sudo systemctl status mongod
   
   # Check port availability
   sudo netstat -tlnp | grep :8001
   ```

2. **Frontend Not Loading**
   ```bash
   # Check S3 bucket policy
   aws s3api get-bucket-policy --bucket your-bucket-name
   
   # Check CloudFront distribution
   aws cloudfront get-distribution --id your-distribution-id
   ```

3. **SSL Certificate Issues**
   ```bash
   # Check certificate status
   sudo certbot certificates
   
   # Renew certificate
   sudo certbot renew
   ```

4. **Database Connection Issues**
   ```bash
   # Test MongoDB connection
   mongosh --eval "db.runCommand({connectionStatus: 1})"
   
   # Check MongoDB logs
   sudo tail -f /var/log/mongodb/mongod.log
   ```

### Performance Optimization

1. **Backend Optimization**
   ```bash
   # Enable gzip compression
   sudo nano /etc/nginx/nginx.conf
   # Add gzip configuration
   
   # Optimize MongoDB
   mongosh
   db.collection.createIndex({field: 1})
   ```

2. **Frontend Optimization**
   ```bash
   # Build with optimizations
   npm run build
   
   # Analyze bundle size
   npm install -g webpack-bundle-analyzer
   npx webpack-bundle-analyzer build/static/js/*.js
   ```

---

## Deployment Checklist

### Pre-Deployment
- [ ] Code tested locally
- [ ] Environment variables configured
- [ ] Database backup created
- [ ] SSL certificates ready
- [ ] Domain configured

### Deployment
- [ ] EC2 instance launched and configured
- [ ] Backend deployed with PM2
- [ ] Nginx configured
- [ ] Frontend built and uploaded to S3
- [ ] CloudFront distribution created
- [ ] DNS records configured
- [ ] SSL certificates installed

### Post-Deployment
- [ ] Test all functionality
- [ ] Monitor logs and metrics
- [ ] Set up alerts
- [ ] Document deployment process
- [ ] Create backup procedures

---

## Maintenance

### Regular Tasks

1. **Weekly**
   - Check system logs
   - Monitor resource usage
   - Review security alerts

2. **Monthly**
   - Update system packages
   - Review costs
   - Check SSL certificate expiry

3. **Quarterly**
   - Review security configurations
   - Update dependencies
   - Performance optimization

### Backup Strategy

1. **Database Backup**
   ```bash
   # Daily MongoDB backup
   mongodump --out /backup/$(date +%Y%m%d)
   
   # Upload to S3
   aws s3 sync /backup s3://your-backup-bucket/mongodb/
   ```

2. **Code Backup**
   ```bash
   # Git repository
   git push origin main
   
   # Application files
   tar -czf /tmp/app-backup.tar.gz /var/www/portfolio-backend
   aws s3 cp /tmp/app-backup.tar.gz s3://your-backup-bucket/code/
   ```

---

## Contact Information

For support with this deployment guide:
- Email: sisaudiya.dewan17@gmail.com
- LinkedIn: https://linkedin.com/in/dewanshu-sisaudiya
- GitHub: https://github.com/dewanshu-sisaudiya

---

## License

This deployment guide is provided as-is for educational purposes. Please review AWS pricing and terms of service before deployment.

---

*Last Updated: January 2025*
*Version: 1.0*