# library-api-expreess
API sederhana ini hanya memiliki CRUD buku dan user dan mengimplementasikan JWT sebagai validator saat melakukan penambahan buku, mengedit buku, dan mengahapus buku.


## API END POINT
GET /users
GET /users/:id protected
POST /users protected 
DELETE /users/:id protected

GET /books
GET /books/:id
POST /books/:id protected
PUT /books/:id protected
DELETE /books/:id protected

POST /login 
POST /token 

End point yang di protected memerlukan access token yang didapatkan pada saat login dan memasukan pada request Header Authorization dengan value Bearer <accessToken>

