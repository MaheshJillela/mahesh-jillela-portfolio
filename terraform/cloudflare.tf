data "cloudflare_zone" "site" {
  name = var.cloudflare_zone_name
}

# Allow Amazon Certificate Manager to issue certs for this zone.
# Existing CAA records on qishub.in list Let's Encrypt / DigiCert / etc. but not Amazon,
# which caused ACM validation to fail with CAA_ERROR.
resource "cloudflare_record" "caa_amazon" {
  for_each = toset([
    "amazon.com",
    "amazontrust.com",
    "awstrust.com",
    "amazonaws.com",
  ])

  zone_id = data.cloudflare_zone.site.id
  name    = var.cloudflare_zone_name
  type    = "CAA"
  data {
    flags = "0"
    tag   = "issue"
    value = each.value
  }
  ttl     = 300
  comment = "Allow ACM to issue certificates for CloudFront"
}

# ACM DNS validation CNAMEs — must be DNS-only (proxied = false)
resource "cloudflare_record" "acm_validation" {
  for_each = {
    for dvo in aws_acm_certificate.site.domain_validation_options : dvo.domain_name => {
      name    = trimsuffix(dvo.resource_record_name, ".")
      type    = dvo.resource_record_type
      content = trimsuffix(dvo.resource_record_value, ".")
    }
  }

  zone_id         = data.cloudflare_zone.site.id
  name            = each.value.name
  type            = each.value.type
  content         = each.value.content
  ttl             = 60
  proxied         = false
  allow_overwrite = true
  comment         = "ACM DNS validation for ${local.fqdn} (CloudFront)"

  depends_on = [cloudflare_record.caa_amazon]
}

# Site hostname → CloudFront
# proxied MUST be false (grey cloud / DNS only):
# - Browsers resolve directly to CloudFront
# - CloudFront presents the ACM certificate for mahesh.qishub.in
# - Orange-cloud proxy would terminate TLS at Cloudflare and break this ACM + CloudFront setup
resource "cloudflare_record" "site" {
  zone_id         = data.cloudflare_zone.site.id
  name            = var.site_subdomain
  type            = "CNAME"
  content         = aws_cloudfront_distribution.site.domain_name
  ttl             = 1 # Cloudflare: 1 = automatic when proxied=false still applies a TTL; keep automatic
  proxied         = var.cloudflare_proxied
  allow_overwrite = true
  comment         = "Portfolio site → CloudFront (DNS only)"

  depends_on = [
    aws_acm_certificate_validation.site,
  ]
}
