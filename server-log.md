# Server command log

Auto-recorded by the runner. Every approved SSH command + its output goes here.

## 2026-05-13T18:40:14.115Z — Anil ran 1 command(s)
_Pre-SSH: warehouse pushed to GitHub as commit `bcc00b7` so the server's `git pull` will pick it up._

### Command 1 on app as engineer (✓ exit 0, 2989ms)
```
if [ -d ~/shop-in-a-box ]; then
  cd ~/shop-in-a-box && git pull
else
  git clone https://github.com/Innovaine/shop-in-a-box.git ~/shop-in-a-box && cd ~/shop-in-a-box
fi
```

## 2026-05-13T18:40:40.975Z — Anil ran 1 command(s)
_Pre-SSH: warehouse pushed to GitHub as commit `3ef2599` so the server's `git pull` will pick it up._

### Command 1 on app as engineer (✓ exit 0, 6944ms) _(showing tail — full 2,831B stdout + 0B stderr)_
```
cd ~/shop-in-a-box && sudo docker compose down && sudo docker compose build && sudo docker compose up -d
```
STDOUT:
```
…UN npm install --production
#9 0.257 npm warn config production Use `--omit=dev` instead.
#9 2.150 npm warn deprecated multer@1.4.5-lts.2: Multer 1.x is impacted by a number of vulnerabilities, which have been patched in 2.x. You should upgrade to the latest 2.x version.
#9 2.220 npm warn deprecated uuid@9.0.1: uuid@10 and below is no longer supported.  For ESM codebases, update to uuid@latest.  For CommonJS codebases, use uuid@11 (but be aware this version will likely be deprecated in 2028).
#9 2.271 
#9 2.271 added 90 packages, and audited 91 packages in 2s
#9 2.271 
#9 2.271 18 packages are looking for funding
#9 2.271   run `npm fund` for details
#9 2.274 
#9 2.274 1 high severity vulnerability
#9 2.274 
#9 2.274 To address all issues (including breaking changes), run:
#9 2.274   npm audit fix --force
#9 2.274 
#9 2.274 Run `npm audit` for details.
#9 2.275 npm notice
#9 2.275 npm notice New major version of npm available! 10.8.2 -> 11.14.1
#9 2.275 npm notice Changelog: https://github.com/npm/cli/releases/tag/v11.14.1
#9 2.275 npm notice To update run: npm install -g npm@11.14.1
#9 2.275 npm notice
#9 DONE 2.3s

#10 [5/8] COPY src/ ./src/
#10 DONE 0.0s

#11 [6/8] COPY *.html ./
#11 DONE 0.0s

#12 [7/8] COPY *.txt ./
#12 DONE 0.0s

#13 [8/8] COPY *.svg ./
#13 DONE 0.0s

#14 exporting to image
#14 exporting layers
#14 exporting layers 0.4s done
#14 exporting manifest sha256:f447d60a1af7ccc9c9103d104b6261e759a7be048d8fec8bdcb32478e1053de0 done
#14 exporting config sha256:8fa653e99c3774972067084bafdb1a15ec8655136f35535085d0d69eadd3bb64 done
#14 exporting attestation manifest sha256:f62698ef0610ec4c8044b59576634786b89b6156d184d4f4e1a4a307b34e489f done
#14 exporting manifest list sha256:f90e1273b441b32b9d1b38dd7c1219ab16789c437aef7063241159fd253c6871 done
#14 naming to docker.io/library/shop-in-a-box-app:latest done
#14 unpacking to docker.io/library/shop-in-a-box-app:latest
#14 unpacking to docker.io/library/shop-in-a-box-app:latest 0.3s done
#14 DONE 0.8s

#15 resolving provenance for metadata file
#15 DONE 0.0s
```
Full output: [`server-runs/2026-05-13T18-40-40-app-cd-shop-in-a-box-sudo-docker-compose-dow-1.log`](server-runs/2026-05-13T18-40-40-app-cd-shop-in-a-box-sudo-docker-compose-dow-1.log)

## 2026-05-13T18:41:04.887Z — Anil ran 1 command(s)
_Pre-SSH: warehouse pushed to GitHub as commit `6d6396d` so the server's `git pull` will pick it up._

### Command 1 on app as engineer (✓ exit 0, 5412ms)
```
sleep 3 && curl -f http://localhost:3000/health && echo "" && curl -I http://localhost:3000/upload
```
STDOUT:
```
{"status":"ok","timestamp":"2026-05-13T18:41:04.686Z","merchants":0,"orders":0}
HTTP/1.1 200 OK
X-Powered-By: Express
Accept-Ranges: bytes
Cache-Control: public, max-age=0
Last-Modified: Wed, 13 May 2026 18:40:14 GMT
ETag: W/"34c0-19e22a3b2b0"
Content-Type: text/html; charset=UTF-8
Content-Length: 13504
Date: Wed, 13 May 2026 18:41:04 GMT
Connection: keep-alive
Keep-Alive: timeout=5
```
Full output: [`server-runs/2026-05-13T18-41-04-app-sleep-3-curl--f-http-localhost-3000-heal-1.log`](server-runs/2026-05-13T18-41-04-app-sleep-3-curl--f-http-localhost-3000-heal-1.log)

## 2026-05-13T18:41:46.309Z — Søren ran 1 command(s)
_Pre-SSH: warehouse pushed to GitHub as commit `fb7a2b1` so the server's `git pull` will pick it up._

### Command 1 on app as reviewer (✗ exit 1, 2474ms)
```
cd ~/shop-in-a-box && git pull --ff-only
```
ERROR: command exited 1

## 2026-05-13T18:41:59.776Z — Søren ran 1 command(s)
_Pre-SSH: warehouse pushed to GitHub as commit `9ab01a0` so the server's `git pull` will pick it up._

### Command 1 on app as reviewer (✓ exit 0, 3241ms)
```
cd ~ && git clone https://github.com/Innovaine/shop-in-a-box.git shop-in-a-box 2>&1 | head -20
```
STDOUT:
```
Cloning into 'shop-in-a-box'...
```
Full output: [`server-runs/2026-05-13T18-41-59-app-cd-git-clone-https-github.com-Innovaine--1.log`](server-runs/2026-05-13T18-41-59-app-cd-git-clone-https-github.com-Innovaine--1.log)

## 2026-05-13T18:42:12.325Z — Søren ran 1 command(s)
_Pre-SSH: warehouse pushed to GitHub as commit `ec959eb` so the server's `git pull` will pick it up._

### Command 1 on app as reviewer (✓ exit 0, 3101ms)
```
cd ~/shop-in-a-box && docker compose build 2>&1 | tail -30
```
STDOUT:
```
#8 CACHED

#9 [2/8] WORKDIR /app
#9 CACHED

#10 [6/8] COPY *.html ./
#10 CACHED

#11 [4/8] RUN npm install --production
#11 CACHED

#12 [5/8] COPY src/ ./src/
#12 CACHED

#13 [8/8] COPY *.svg ./
#13 CACHED

#14 exporting to image
#14 exporting layers done
#14 exporting manifest sha256:f447d60a1af7ccc9c9103d104b6261e759a7be048d8fec8bdcb32478e1053de0 done
#14 exporting config sha256:8fa653e99c3774972067084bafdb1a15ec8655136f35535085d0d69eadd3bb64 done
#14 exporting attestation manifest sha256:b9c86725d55dd3cfda1ec3787573b832763dd3be5d9061290a52b841a919381f 0.0s done
#14 exporting manifest list sha256:c9f50908c477f349cde4237f354d05284277257d25722e9a79c9e8dec187f89b done
#14 naming to docker.io/library/shop-in-a-box-app:latest done
#14 unpacking to docker.io/library/shop-in-a-box-app:latest done
#14 DONE 0.1s

#15 resolving provenance for metadata file
#15 DONE 0.0s
 Image shop-in-a-box-app Built
```
Full output: [`server-runs/2026-05-13T18-42-12-app-cd-shop-in-a-box-docker-compose-build-2--1.log`](server-runs/2026-05-13T18-42-12-app-cd-shop-in-a-box-docker-compose-build-2--1.log)

## 2026-05-13T18:42:30.328Z — Søren ran 1 command(s)
_Pre-SSH: warehouse pushed to GitHub as commit `feb3e57` so the server's `git pull` will pick it up._

### Command 1 on app as reviewer (✓ exit 0, 6808ms)
```
cd ~/shop-in-a-box && docker compose down && docker compose up -d && sleep 3 && curl -s http://localhost:3000/health | jq .
```
STDOUT:
```
{
  "status": "ok",
  "timestamp": "2026-05-13T18:42:29.993Z",
  "merchants": 0,
  "orders": 0
}
```
Full output: [`server-runs/2026-05-13T18-42-30-app-cd-shop-in-a-box-docker-compose-down-doc-1.log`](server-runs/2026-05-13T18-42-30-app-cd-shop-in-a-box-docker-compose-down-doc-1.log)

## 2026-05-13T18:42:51.047Z — Søren ran 1 command(s)
_Pre-SSH: warehouse pushed to GitHub as commit `c3e2094` so the server's `git pull` will pick it up._

### Command 1 on app as reviewer (✓ exit 0, 3272ms)
```
cd ~/shop-in-a-box && cat > /tmp/test_merchant.sh << 'EOF'
#!/bin/bash

# Test: POST /api/merchant/create with valid data (no images for now)
RESPONSE=$(curl -s -X POST http://localhost:3000/api/merchant/create \
  -H "Content-Type: application/json" \
  -d '{
    "shopName": "Test Florist",
    "category": "flowers",
    "email": "florist@example.com",
    "items": [
      {"name": "Rose Bouquet", "description": "12 red roses", "price": 25.00},
      {"name": "Daisy Bundle", "description": "20 daisies", "price": 15.00}
    ]
  }')

echo "=== CREATE MERCHANT RESPONSE ==="
echo "$RESPONSE" | jq .

# Extract merchant ID
MERCHANT_ID=$(echo "$RESPONSE" | jq -r '.merchantId')
echo ""
echo "MERCHANT_ID: $MERCHANT_ID"

# Test: GET /api/merchant/:merchantId
echo ""
echo "=== GET MERCHANT DATA ==="
curl -s http://localhost:3000/api/merchant/$MERCHANT_ID | jq .
EOF
chmod +x /tmp/test_merchant.sh
/tmp/test_merchant.sh
```
STDOUT:
```
=== CREATE MERCHANT RESPONSE ===
{
  "success": true,
  "merchantId": "2f2dee61-2542-4456-8098-be8d249e5a40",
  "shopUrl": "http://localhost:3000/shop/2f2dee61-2542-4456-8098-be8d249e5a40"
}

MERCHANT_ID: 2f2dee61-2542-4456-8098-be8d249e5a40

=== GET MERCHANT DATA ===
{
  "id": "2f2dee61-2542-4456-8098-be8d249e5a40",
  "shopName": "Test Florist",
  "category": "flowers",
  "items": [
    {
      "id": "5c365a10-29fd-4762-9f5e-eb8ee0c8e56d",
      "name": "Rose Bouquet",
      "description": "12 red roses",
      "price": 25,
      "image": null,
      "addedAt": "2026-05-13T18:42:50.960Z"
    },
    {
      "id": "97822d41-ed13-49ef-a44c-d3855190ad95",
      "name": "Daisy Bundle",
      "description": "20 daisies",
      "price": 15,
      "image": null,
      "addedAt": "2026-05-13T18:42:50.960Z"
    }
  ],
  "email": "florist@example.com",
  "createdAt": "2026-05-13T18:42:50.960Z"
}
```
Full output: [`server-runs/2026-05-13T18-42-51-app-cd-shop-in-a-box-cat-tmp-test_merchant.s-1.log`](server-runs/2026-05-13T18-42-51-app-cd-shop-in-a-box-cat-tmp-test_merchant.s-1.log)

## 2026-05-13T18:43:13.151Z — Søren ran 1 command(s)
_Pre-SSH: warehouse pushed to GitHub as commit `b4d34cc` so the server's `git pull` will pick it up._

### Command 1 on app as reviewer (✓ exit 0, 2336ms)
```
cd ~/shop-in-a-box && cat > /tmp/test_order.sh << 'EOF'
#!/bin/bash

MERCHANT_ID="2f2dee61-2542-4456-8098-be8d249e5a40"

# Test: POST /api/order/create
RESPONSE=$(curl -s -X POST http://localhost:3000/api/order/create \
  -H "Content-Type: application/json" \
  -d '{
    "merchantId": "'$MERCHANT_ID'",
    "items": [
      {"id": "5c365a10-29fd-4762-9f5e-eb8ee0c8e56d", "name": "Rose Bouquet", "price": 25.00}
    ],
    "customerName": "John Doe",
    "customerEmail": "john@example.com",
    "customerPhone": "555-1234",
    "customerAddress": "123 Main St, City, State 12345",
    "notes": "Please leave at front door",
    "total": 25.00
  }')

echo "=== CREATE ORDER RESPONSE ==="
echo "$RESPONSE" | jq .

ORDER_ID=$(echo "$RESPONSE" | jq -r '.orderId')
echo ""
echo "ORDER_ID: $ORDER_ID"
EOF
chmod +x /tmp/test_order.sh
/tmp/test_order.sh
```
STDOUT:
```
=== CREATE ORDER RESPONSE ===
{
  "success": true,
  "orderId": "3dfabf8e-9c7b-4a53-a353-ee2687a59159",
  "message": "Order placed successfully! Check your email for confirmation."
}

ORDER_ID: 3dfabf8e-9c7b-4a53-a353-ee2687a59159
```
Full output: [`server-runs/2026-05-13T18-43-13-app-cd-shop-in-a-box-cat-tmp-test_order.sh-E-1.log`](server-runs/2026-05-13T18-43-13-app-cd-shop-in-a-box-cat-tmp-test_order.sh-E-1.log)

## 2026-05-13T18:43:36.045Z — Søren ran 1 command(s)
_Pre-SSH: warehouse pushed to GitHub as commit `6e496d2` so the server's `git pull` will pick it up._

### Command 1 on app as reviewer (✓ exit 0, 2504ms)
```
cd ~/shop-in-a-box && cat > /tmp/test_pages.sh << 'EOF'
#!/bin/bash

echo "=== Testing static HTML pages ==="

echo ""
echo "GET /upload (merchant upload page):"
curl -s -I http://localhost:3000/upload | head -5

echo ""
echo "GET /shop/:merchantId (storefront page):"
curl -s -I http://localhost:3000/shop/2f2dee61-2542-4456-8098-be8d249e5a40 | head -5

echo ""
echo "GET /checkout/:merchantId (checkout page):"
curl -s -I http://localhost:3000/checkout/2f2dee61-2542-4456-8098-be8d249e5a40 | head -5

echo ""
echo "Verifying upload.html is served correctly:"
curl -s http://localhost:3000/upload | head -20 | grep -i "title\|form\|upload"

EOF
chmod +x /tmp/test_pages.sh
/tmp/test_pages.sh
```
STDOUT:
```
=== Testing static HTML pages ===

GET /upload (merchant upload page):
HTTP/1.1 200 OK
X-Powered-By: Express
Accept-Ranges: bytes
Cache-Control: public, max-age=0
Last-Modified: Wed, 13 May 2026 18:40:14 GMT

GET /shop/:merchantId (storefront page):
HTTP/1.1 200 OK
X-Powered-By: Express
Accept-Ranges: bytes
Cache-Control: public, max-age=0
Last-Modified: Wed, 13 May 2026 18:40:14 GMT

GET /checkout/:merchantId (checkout page):
HTTP/1.1 200 OK
X-Powered-By: Express
Accept-Ranges: bytes
Cache-Control: public, max-age=0
Last-Modified: Wed, 13 May 2026 18:40:14 GMT

Verifying upload.html is served correctly:
  <title>Shop-in-a-Box — Merchant Upload</title>
```
Full output: [`server-runs/2026-05-13T18-43-36-app-cd-shop-in-a-box-cat-tmp-test_pages.sh-E-1.log`](server-runs/2026-05-13T18-43-36-app-cd-shop-in-a-box-cat-tmp-test_pages.sh-E-1.log)

## 2026-05-13T18:43:55.135Z — Søren ran 1 command(s)
_Pre-SSH: warehouse pushed to GitHub as commit `2e70156` so the server's `git pull` will pick it up._

### Command 1 on app as reviewer (✓ exit 0, 2682ms)
```
cd ~/shop-in-a-box && docker compose logs app | grep -A 5 "\[EMAIL\]" | tail -20
```
STDOUT:
```
app-1  | [EMAIL] No credentials configured - emails will be logged but not sent
app-1  | [SERVER] Shop-in-a-Box running on port 3000
app-1  | [SERVER] Upload page: http://localhost:3000/upload
app-1  | [EMAIL] Would send email:
app-1  |   To: john@example.com
app-1  |   Subject: Order Confirmation - Test Florist
app-1  |   Body:
app-1  | Hi John Doe,
app-1  | 
--
app-1  | [EMAIL] Would send email:
app-1  |   To: florist@example.com
app-1  |   Subject: New Order Received - Test Florist
app-1  |   Body:
app-1  | You have received a new order!
app-1  |
```
Full output: [`server-runs/2026-05-13T18-43-55-app-cd-shop-in-a-box-docker-compose-logs-app-1.log`](server-runs/2026-05-13T18-43-55-app-cd-shop-in-a-box-docker-compose-logs-app-1.log)

## 2026-05-13T18:45:55.226Z — Priya ran 1 command(s)
_Pre-SSH: warehouse pushed to GitHub as commit `233968d` so the server's `git pull` will pick it up._

### Command 1 on app as tester (✗ exit 1, 2641ms)
```
cd ~/shop-in-a-box && npm install -D @playwright/test
```
ERROR: command exited 1

## 2026-05-13T18:46:11.438Z — Priya ran 1 command(s)
_Pre-SSH: warehouse pushed to GitHub as commit `46efdcf` so the server's `git pull` will pick it up._

### Command 1 on app as tester (✗ exit 1, 2388ms)
```
cd ~/shop-in-a-box && git pull && ls -la tests/
```
ERROR: command exited 1

## 2026-05-13T18:46:25.541Z — Priya ran 1 command(s)
_Pre-SSH: warehouse pushed to GitHub as commit `98e2c02` so the server's `git pull` will pick it up._

### Command 1 on app as tester (✓ exit 0, 2684ms)
```
ls -la ~/
```
STDOUT:
```
total 40
drwxr-x---  7 tester tester 4096 May 13 06:41 .
drwxr-xr-x  7 root   root   4096 May 13 18:28 ..
-rw-r--r--  1 tester tester  220 Mar 31  2024 .bash_logout
-rw-r--r--  1 tester tester 3771 Mar 31  2024 .bashrc
drwx------  3 tester tester 4096 May 13 16:35 .cache
drwx------  3 tester tester 4096 May 13 06:04 .docker
drwxrwxr-x  4 tester tester 4096 May 13 06:41 .npm
-rw-r--r--  1 tester tester  807 Mar 31  2024 .profile
drwx------  2 tester tester 4096 May 13 05:11 .ssh
drwxrwxr-x 23 tester tester 4096 May 13 17:23 email-to-sql
```
Full output: [`server-runs/2026-05-13T18-46-25-app-ls--la-1.log`](server-runs/2026-05-13T18-46-25-app-ls--la-1.log)

## 2026-05-13T18:47:06.703Z — Priya ran 1 command(s)
_Pre-SSH: warehouse pushed to GitHub as commit `e4c7741` so the server's `git pull` will pick it up._

### Command 1 on app as tester (✓ exit 0, 3093ms)
```
git clone https://github.com/Innovaine/shop-in-a-box.git ~/shop-in-a-box && cd ~/shop-in-a-box && ls -la tests/
```
STDOUT:
```
total 12
drwxrwxr-x 3 tester tester 4096 May 13 18:47 .
drwxrwxr-x 9 tester tester 4096 May 13 18:47 ..
drwxrwxr-x 2 tester tester 4096 May 13 18:47 web
```
Full output: [`server-runs/2026-05-13T18-47-06-app-git-clone-https-github.com-Innovaine-sho-1.log`](server-runs/2026-05-13T18-47-06-app-git-clone-https-github.com-Innovaine-sho-1.log)

## 2026-05-13T18:47:23.364Z — Priya ran 1 command(s)
_Pre-SSH: warehouse pushed to GitHub as commit `a059cb8` so the server's `git pull` will pick it up._

### Command 1 on app as tester (✓ exit 0, 4488ms)
```
cd ~/shop-in-a-box && npm install -D @playwright/test 2>&1
```
STDOUT:
```
npm warn deprecated multer@1.4.5-lts.2: Multer 1.x is impacted by a number of vulnerabilities, which have been patched in 2.x. You should upgrade to the latest 2.x version.
npm warn deprecated uuid@9.0.1: uuid@10 and below is no longer supported.  For ESM codebases, update to uuid@latest.  For CommonJS codebases, use uuid@11 (but be aware this version will likely be deprecated in 2028).

added 93 packages, and audited 94 packages in 2s

18 packages are looking for funding
  run `npm fund` for details

1 high severity vulnerability

To address all issues (including breaking changes), run:
  npm audit fix --force

Run `npm audit` for details.
```
Full output: [`server-runs/2026-05-13T18-47-23-app-cd-shop-in-a-box-npm-install--D-playwrig-1.log`](server-runs/2026-05-13T18-47-23-app-cd-shop-in-a-box-npm-install--D-playwrig-1.log)

## 2026-05-13T18:48:20.391Z — Priya ran 1 command(s)
_Pre-SSH: warehouse pushed to GitHub as commit `8c26fb4` so the server's `git pull` will pick it up._

### Command 1 on app as tester (✗ exec-error: SSH exec timeout (30000ms), 31803ms)
```
cd ~/shop-in-a-box && PLAYWRIGHT_BROWSERS_PATH=/usr/local/share/playwright-browsers npx playwright test tests/web/ --reporter=list 2>&1
```
ERROR: SSH exec timeout (30000ms)

## 2026-05-13T18:48:38.402Z — Priya ran 1 command(s)
_Pre-SSH: warehouse pushed to GitHub as commit `340e229` so the server's `git pull` will pick it up._

### Command 1 on app as tester (✓ exit 0, 2592ms)
```
curl -s http://localhost:3000/health | jq . && docker ps | grep shop
```
STDOUT:
```
{
  "status": "ok",
  "timestamp": "2026-05-13T18:48:38.290Z",
  "merchants": 4,
  "orders": 1
}
e1247e9c9f61   shop-in-a-box-app           "docker-entrypoint.s…"   6 minutes ago       Up 6 minutes (unhealthy)     0.0.0.0:3000->3000/tcp, [::]:3000->3000/tcp   shop-in-a-box-app-1
```
Full output: [`server-runs/2026-05-13T18-48-38-app-curl--s-http-localhost-3000-health-jq-.--1.log`](server-runs/2026-05-13T18-48-38-app-curl--s-http-localhost-3000-health-jq-.--1.log)

## 2026-05-13T18:48:57.102Z — Priya ran 1 command(s)
_Pre-SSH: warehouse pushed to GitHub as commit `6665896` so the server's `git pull` will pick it up._

### Command 1 on app as tester (✓ exit 0, 3863ms)
```
cd ~/shop-in-a-box && timeout 120 bash -c 'PLAYWRIGHT_BROWSERS_PATH=/usr/local/share/playwright-browsers npx playwright test tests/web/storefront.spec.ts --reporter=list' 2>&1 | tee /tmp/playwright-storefront.log && echo "EXIT_CODE: $?"
```
STDOUT:
```

Running 1 test using 1 worker

✓ Created test merchant: 05d2d40a-e674-4f7b-8859-1b8e575fe29a
  ✘  1 tests/web/storefront.spec.ts:5:5 › storefront displays merchant products correctly (127ms)


  1) tests/web/storefront.spec.ts:5:5 › storefront displays merchant products correctly ────────────

    Error: [2mexpect([22m[31mlocator[39m[2m).[22mtoContainText[2m([22m[32mexpected[39m[2m)[22m failed

    Locator: locator('h1, h2')
    Expected substring: [32m"Test Bakery"[39m
    Error: strict mode violation: locator('h1, h2') resolved to 2 elements:
        1) <h1 class="hero-heading">Order Fresh Flowers</h1> aka getByRole('heading', { name: 'Order Fresh Flowers' })
        2) <h2 class="checkout-heading">Complete Your Order</h2> aka getByText('Complete Your Order')

    Call log:
    [2m  - Expect "toContainText" with timeout 5000ms[22m
    [2m  - waiting for locator('h1, h2')[22m


      31 |   
      32 |   // Check page title/header displays shop name
    > 33 |   await expect(page.locator('h1, h2')).toContainText('Test Bakery');
         |                                        ^
      34 |   
      35 |   // Verify all three products are displayed
      36 |   const productCards = page.locator('[data-testid="product-card"], .product-item, .product');
        at /home/tester/shop-in-a-box/tests/web/storefront.spec.ts:33:40

    Error Context: test-results/tests-web-storefront-store-d8d8d-merchant-products-correctly/error-context.md

  1 failed
    tests/web/storefront.spec.ts:5:5 › storefront displays merchant products correctly ─────────────
EXIT_CODE: 0
```
Full output: [`server-runs/2026-05-13T18-48-57-app-cd-shop-in-a-box-timeout-120-bash--c-PLA-1.log`](server-runs/2026-05-13T18-48-57-app-cd-shop-in-a-box-timeout-120-bash--c-PLA-1.log)
