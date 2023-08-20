# library-api-expreess
API sederhana ini hanya memiliki CRUD buku dan user dan mengimplementasikan JWT sebagai validator saat melakukan penambahan buku, mengedit buku, dan mengahapus buku.
<br>

## API END POINT <br> 
GET /users <br>
GET /users/:id protected <br>
POST /users protected  <br>
DELETE /users/:id protected <br>
<br>
GET /books <br>
GET /books/:id <br>
POST /books/:id protected <br>
PUT /books/:id protected <br>
DELETE /books/:id protected <br>

<br>
POST /login <br> 
POST /token <br>
<br>
End point yang di protected memerlukan access token yang didapatkan pada saat login dan memasukan pada request Header Authorization dengan value Bearer <accessToken>

