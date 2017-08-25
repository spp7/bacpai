# api-bca
API palsu bca

BASE_URL  http://localhost:3000/api/sakuku_p 

| URL        | Method           | Purpose  |
| ------------- |:-------------:| -----:|
| createUser     | POST | register customer wallet  |
| userInquiry/:CompanyCode/:PrimaryID | GET |  show customer data and the amount of its balance  |
| userUpdate | PUT      |  update customer data  |
| transferCompanyAccount     | POST | transfer from sub account to company account |
| transferCompanyAccountInquiry/:CompanyCode/:PrimaryID     | GET | inquiry transfer company account |
| transactionInquiry/:CompanyCode/:PrimaryID | GET | get the transaction list of a e-wallet user until 31 days behind. The maximum total of transactions returned is 10 |
| createTopup     | PUT | add funds to user e-wallet. Through the instruction of the e-wallet issuer => transaksi dulu baru create topup |
| topupInquiry/:CompanyCode/:PrimaryID     | GET |  show top up data |
| generateOTP     | POST | generateOTP  |

controllers: palsuCtrl.js
contoh data: https://www.getpostman.com/collections/e2a3cc0926b3d645f523

urutan penting! 
