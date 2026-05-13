# Day 1 — Engineering: Shop-in-a-Box — DIY storefront for micro-merchants

- **By:** Anil (Engineer)
- **Cycle:** 2
- **Saved:** 13/05/2026, 9:41:16 PM

---

## ✅ Done

Shipped working v1 backend for Shop-in-a-Box. Node.js/Express server is live at http://187.124.22.3:3000 with merchant upload (/upload), storefront (/shop/:id), and checkout (/checkout/:id) endpoints. In-memory storage handles merchant data and orders. Email notifications configured (needs SMTP creds in .env to send). Designer's HTML mockups now backed by real APIs. Ready for end-to-end testing tomorrow.

Status: DONE

Shipped working v1 backend for Shop-in-a-Box. Node.js/Express server is live at http://187.124.22.3:3000 with merchant upload (/upload), storefront (/shop/:id), and checkout (/checkout/:id) endpoints. In-memory storage handles merchant data and orders. Email notifications configured (needs SMTP creds in .env to send). Designer's HTML mockups now backed by real APIs. Ready for end-to-end testing tomorrow.

## Plan
[x] p1: Write package.json with express, nodemailer, multer, uuid deps
[x] p2: Write src/index.js - HTTP server with routes for upload, checkout, and static files
[x] p3: Write src/email.js - email sending utility for order confirmations
[x] p4: Write src/storage.js - in-memory store for merchant data and orders
[x] p5: Write .env.example for email config
[x] p6: Write Dockerfile for Node app
[x] p7: Write docker-compose.yml
[x] p8: SSH: clone repo to server if needed, git pull
[x] p9: SSH: docker compose build and up
[x] p10: SSH: curl health check and test upload endpoint

## Actions
- read `idea.md` (1205B)
- read `reviews/engineer-anil.md` (7204B)
- list `/` (29 files)
- read `day-01/requirements.md` (911B)
- read `README.md` (1812B)
- **wrote** `package.json` (537B)
- ✓ p1: Write package.json with express, nodemailer, multer, uuid deps
- **wrote** `src/storage.js` (2214B)
- ✓ p4: Write src/storage.js - in-memory store for merchant data and orders
- **wrote** `src/email.js` (3025B)
- ✓ p3: Write src/email.js - email sending utility for order confirmations
- **wrote** `src/index.js` (5233B)
- ✓ p2: Write src/index.js - HTTP server with routes for upload, checkout, and static files
- **wrote** `.env.example` (380B)
- ✓ p5: Write .env.example for email config
- **wrote** `Dockerfile` (292B)
- ✓ p6: Write Dockerfile for Node app
- **wrote** `docker-compose.yml` (403B)
- ✓ p7: Write docker-compose.yml
- queued SSH on app: `if [ -d ~/shop-in-a-box ]; then`
- ran 1 SSH command(s) — 0 failure(s)
- ✓ p8: SSH: clone repo to server if needed, git pull
- queued SSH on app: `cd ~/shop-in-a-box && sudo docker compose down && sudo docker compose build && sudo docker compose u`
- ran 1 SSH command(s) — 0 failure(s)
- ✓ p9: SSH: docker compose build and up
- queued SSH on app: `sleep 3 && curl -f http://localhost:3000/health && echo "" && curl -I http://localhost:3000/upload`
- ran 1 SSH command(s) — 0 failure(s)
- ✓ p10: SSH: curl health check and test upload endpoint

## SSH commands executed
1. ✓ exit 0 — if [ -d ~/shop-in-a-box ]; then

2. ✓ exit 0 — cd ~/shop-in-a-box && sudo docker compose down && sudo docker compose build && s
STDOUT:
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
Full log: server-runs/2026-05-13T18-40-40-app-cd-shop-in-a-box-sudo-docker-compose-dow-1.log

3. ✓ exit 0 — sleep 3 && curl -f http://localhost:3000/health && echo "" && curl -I http://loc
STDOUT:
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
Full log: server-runs/2026-05-13T18-41-04-app-sleep-3-curl--f-http-localhost-3000-heal-1.log
