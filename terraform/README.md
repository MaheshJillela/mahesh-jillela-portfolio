# AWS + Cloudflare DNS deployment (Terraform)

Static hosting for this TanStack Start portfolio:

**Cloudflare DNS → CloudFront → Private S3 → HTTPS**

- AWS: profile `mahesh-aws`, region `ap-south-1` (ACM in `us-east-1`)
- DNS: Cloudflare zone `qishub.in` (no Route 53)
- Site URL: `https://mahesh.qishub.in`

Credentials are never hardcoded. Pass the Cloudflare token via `TF_VAR_cloudflare_api_token` or `terraform.tfvars` (gitignored).

## Application notes

| Item | Value |
|------|--------|
| App type | TanStack Start (React + Vite + Nitro) |
| Build command | `npm run build` |
| Upload directory | `.output/public` |

## Cloudflare proxying (important)

The `mahesh` CNAME is created with **`proxied = false` (DNS only / grey cloud)**.

| Mode | Should you use it? |
|------|--------------------|
| **DNS only (grey cloud)** | **Yes** — browsers resolve to CloudFront; CloudFront serves HTTPS with the ACM cert for `mahesh.qishub.in`. |
| **Proxied (orange cloud)** | **No** for this stack — Cloudflare would terminate TLS and sit in front of CloudFront, which breaks the ACM + CloudFront custom-domain setup. |

ACM validation CNAMEs are also always DNS-only (`proxied = false`).

## Prerequisites

1. AWS CLI profile `mahesh-aws`
2. Terraform `>= 1.5`
3. Cloudflare zone for `qishub.in`
4. Cloudflare API token with **Zone → Zone → Read** and **Zone → DNS → Edit** on `qishub.in`

```bash
aws sts get-caller-identity --profile mahesh-aws
export TF_VAR_cloudflare_api_token="your-cloudflare-api-token"
```

## Configure variables

```bash
cd terraform
cp terraform.tfvars.example terraform.tfvars
```

Defaults already target `https://mahesh.qishub.in`. Set the token via env (preferred) or in `terraform.tfvars`.

---

## 1. terraform init

```bash
cd terraform
terraform init
```

## 2. terraform validate

```bash
terraform validate
```

## 3. terraform plan

```bash
terraform plan
```

## 4. terraform apply

```bash
terraform apply
```

First apply waits on ACM DNS validation (Cloudflare CNAME) then CloudFront.

```bash
terraform output
```

## 5. Build the application

```bash
cd ..
npm install
npm run build
```

Assets: `.output/public`

## 6. Upload the build to S3

```bash
cd terraform
BUCKET=$(terraform output -raw s3_bucket_name)

aws s3 sync ../.output/public "s3://${BUCKET}/" \
  --profile mahesh-aws \
  --region ap-south-1 \
  --delete \
  --cache-control "public,max-age=31536000,immutable" \
  --exclude "index.html" \
  --exclude "*.html"

aws s3 sync ../.output/public "s3://${BUCKET}/" \
  --profile mahesh-aws \
  --region ap-south-1 \
  --exclude "*" \
  --include "*.html" \
  --cache-control "public,max-age=0,must-revalidate" \
  --content-type "text/html"
```

## 7. CloudFront cache invalidation

```bash
DIST_ID=$(terraform output -raw cloudfront_distribution_id)

aws cloudfront create-invalidation \
  --profile mahesh-aws \
  --distribution-id "$DIST_ID" \
  --paths "/*"
```

```bash
terraform output -raw website_url
```

## 8. terraform destroy

```bash
cd terraform
terraform destroy
```

If S3 destroy fails because the bucket is not empty:

```bash
BUCKET=$(terraform output -raw s3_bucket_name)
aws s3 rm "s3://${BUCKET}/" --recursive --profile mahesh-aws --region ap-south-1
terraform destroy
```

---

## Resources created

| Resource | Purpose |
|----------|---------|
| S3 bucket | Hosts `.output/public` (versioning + SSE-S3) |
| S3 public access block + OAC policy | Private bucket; CloudFront-only reads |
| CloudFront OAC + distribution | HTTPS CDN with ACM cert |
| ACM certificate (`us-east-1`) | TLS for `mahesh.qishub.in` |
| Cloudflare ACM CNAME(s) | DNS validation for ACM |
| Cloudflare site CNAME | `mahesh` → `*.cloudfront.net` (DNS only) |
| Optional IAM deploy user | S3 sync + CloudFront invalidation |

## Architecture

```text
Browser ──HTTPS──► Cloudflare DNS (DNS-only CNAME)
                      │
                      ▼
                 CloudFront (ACM cert in us-east-1)
                      │  OAC (SigV4)
                      ▼
                 Private S3 bucket
                      ▲
                 aws s3 sync (.output/public)
```

## File layout

```text
terraform/
  versions.tf
  providers.tf
  variables.tf
  locals.tf
  s3.tf
  cloudfront.tf
  acm.tf
  cloudflare.tf
  iam.tf
  outputs.tf
  terraform.tfvars.example
  .gitignore
  README.md
```
