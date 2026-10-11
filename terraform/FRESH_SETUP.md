# Fresh AWS account + Terraform setup

Target URL: **https://mahesh.qishub.in**

Architecture: **Cloudflare DNS → CloudFront → private S3**

---

## Part 1 — What to do in AWS (new account)

### 1. Sign in to the new account
Use the AWS Console for the **new** account (root or IAM admin).

### 2. Create an IAM user for Terraform (recommended)
1. IAM → Users → **Create user** (e.g. `mahesh-terraform`)
2. Attach policy: **AdministratorAccess** (fine for learning; tighten later)
3. Create user → **Security credentials** → **Create access key** → CLI
4. Save **Access key ID** and **Secret access key** (shown once)

### 3. Configure the AWS CLI profile on your Mac

Your current `mahesh-aws` profile still points at the **old** account (`267965637813`). Overwrite it with the new account keys:

```bash
aws configure --profile mahesh-aws
```

Enter:
- Access key ID (new account)
- Secret access key (new account)
- Default region: `ap-south-1`
- Output format: `json`

### 4. Verify you are on the NEW account

```bash
aws sts get-caller-identity --profile mahesh-aws
```

Confirm `Account` is **not** `267965637813`. Copy the new Account ID.

### 5. Cloudflare API token (reuse or create)
Token needs: **Zone → Zone → Read** and **Zone → DNS → Edit** on `qishub.in`.

```bash
export TF_VAR_cloudflare_api_token="YOUR_CLOUDFLARE_TOKEN"
```

---

## Part 2 — Terraform (after AWS CLI is on the new account)

Old Terraform state for the previous AWS account was archived under  
`terraform/.state-archive-old-account/` so this is a clean apply.

```bash
cd ~/dev/workspace/mahesh/portfolio/animated-experience-portfolio/terraform

export TF_VAR_cloudflare_api_token="YOUR_CLOUDFLARE_TOKEN"

terraform init
terraform validate
terraform plan
terraform apply
```

Type `yes` when prompted. First apply creates:

| Resource | Notes |
|----------|--------|
| S3 bucket | `animated-experience-portfolio-<NEW_ACCOUNT_ID>` |
| CloudFront + OAC | HTTPS CDN |
| ACM cert (`us-east-1`) | For `mahesh.qishub.in` |
| Cloudflare CAA + validation CNAME | Lets Amazon issue the cert |
| Cloudflare CNAME `mahesh` | DNS-only → CloudFront |

Then deploy the app:

```bash
cd ..
npm run build

cd terraform
BUCKET=$(terraform output -raw s3_bucket_name)
DIST_ID=$(terraform output -raw cloudfront_distribution_id)

aws s3 sync ../.output/public "s3://${BUCKET}/" \
  --profile mahesh-aws --region ap-south-1 --delete \
  --cache-control "public,max-age=31536000,immutable" \
  --exclude "index.html" --exclude "*.html"

aws s3 sync ../.output/public "s3://${BUCKET}/" \
  --profile mahesh-aws --region ap-south-1 \
  --exclude "*" --include "*.html" \
  --cache-control "public,max-age=0,must-revalidate" \
  --content-type "text/html"

aws cloudfront create-invalidation \
  --profile mahesh-aws \
  --distribution-id "$DIST_ID" \
  --paths "/*"

terraform output -raw website_url
```

---

## Infra notes (updated for fresh account)

- No Route 53 — DNS is Cloudflare only
- S3 is **created by Terraform** (`existing_s3_bucket_name = ""`)
- Deploy IAM user is **off** by default (`create_deploy_user = false`); use `mahesh-aws` to sync
- ACM stays in `us-east-1`; CAA records allow Amazon to issue certs
- Cloudflare site record stays **proxied = false** (grey cloud)

Old account leftovers (optional cleanup later): ACM cert, OAC, IAM deploy user in account `267965637813`. They are no longer managed by this state.
