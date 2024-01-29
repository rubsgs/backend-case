# Como executar este projeto

Criar um arquivo `.env` a partir do arquivo `.env.example`.

```
npm install
npm run start
```

O projeto permite a criação de usuário para testes através do endpoint `/user/seed`:

```
curl --location --request POST 'http://localhost:3000/users/seed' \
--form 'username="rubens34"' \
--form 'password="senha"'
```

# Rotas

## POST `/login`

Endpoint utilizado para gerar o JWT para os demais endpoints.

### Headers

Authorization Basic

### Exemplo de requisição

```
curl --location --request POST 'http://localhost:3000/login' \
--header 'Authorization: Basic ZXhlbXBsbzpzZW5oYQ=='
```

### Exemplo retorno

```
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWI2ZWU0Y2NhZjExODU5NmYyYmY3YmIiLCJ1c2VybmFtZSI6InJ1YmVucyIsImlhdCI6MTcwNjUyMjU4MCwiZXhwIjoxNzA2NTI2MTgwfQ.LkbE6-9VgbfUqOPStOZ9QIP86ZlN32YRCTp4to0I4q4"
}
```

## POST `/users`

Endpoint para criação de usuários, retorna o status `200 OK` em caso de sucesso.

### Exemplo de requisição

```
curl --location --request POST 'http://localhost:3000/users' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWI2ZWU0Y2NhZjExODU5NmYyYmY3YmIiLCJ1c2VybmFtZSI6InJ1YmVucyIsImlhdCI6MTcwNjUyMTUwNCwiZXhwIjoxNzA2NTI1MTA0fQ.q0PVV20q_FstVVucws92Bz86Keb-L-Qgnr3rIDD8uG0' \
--form 'username="exemplo"' \
--form 'password="senha"'
```

## POST `/documents`

Endpoint para upload de arquivos. Utilize o header de content-type `multipart/form-data;`

### Parâmetros

- file: Arquivo a ser enviado;
- digest: Hash do arquivo criado utilizando sha256 para verificação de integridade;
- name: Nome do arquivo;
- categories[]: Array de strings contendo as categorias do arquivo(opcional);

### Exemplo de requisição

```
curl --location --request POST 'http://localhost:3000/documents' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWI2ZWU0Y2NhZjExODU5NmYyYmY3YmIiLCJ1c2VybmFtZSI6InJ1YmVucyIsImlhdCI6MTcwNjUyMTUwNCwiZXhwIjoxNzA2NTI1MTA0fQ.q0PVV20q_FstVVucws92Bz86Keb-L-Qgnr3rIDD8uG0' \
--form 'file=@"/C:/Users/rgsru/Downloads/cv_info_eng_20231020.pdf"' \
--form 'digest="be1f759fbbcc187aa9be707ea6d0b6b32bc2b2817320dcdb89957a3c8e4080df"' \
--form 'name="test2.pdf"' \
--form 'categories="categoria1"' \
--form 'categories="categoria4"'
```

### Exemplo de retorno

```
{
    "name": "teste.pdf",
    "originalName": "arquivo.pdf",
    "content": {
        "type": "Buffer",
        "data": [<file_data>]
    },
    "verificationDigest": "be1f759fbbcc187aa9be707ea6d0b6b32bc2b2817320dcdb89957a3c8e4080df",
    "type": "application/pdf",
    "version": 1,
    "uuid": "046d80dd-4754-4a4a-b506-841005f2d061",
    "categories": [
        "categoria1",
        "categoria4"
    ],
    "_id": "65b77520140bd8a6f9dd535a",
    "__v": 0
}
```

### GET `/documents?categories[]=categoria&categoria[]=categoria2...`

Endpoint para busca de documentos através da categorias

### Parâmetros

- categories: Array de string content as categorias que serão buscadas

### Exemplo de requisição

```
curl --location -g --request GET 'http://localhost:3000/documents?categories[]=categoria3&categories[]=categoria4' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWI2ZWU0Y2NhZjExODU5NmYyYmY3YmIiLCJ1c2VybmFtZSI6InJ1YmVucyIsImlhdCI6MTcwNjQ5MTM2NCwiZXhwIjoxNzA2NDk0OTY0fQ.kKiiOGQc5CNtW2-2-7z7zcA1ypxnWnc64TUzdqt3u_I'
```

## GET `/documents/:uuid`

Retorna o documento com o `uuid` informado.

```
curl --location --request GET 'http://localhost:3000/documents/dcdcaef4-d8bc-433e-9bd0-1109bd290cd7' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWI2ZWU0Y2NhZjExODU5NmYyYmY3YmIiLCJ1c2VybmFtZSI6InJ1YmVucyIsImlhdCI6MTcwNjQ5MTM2NCwiZXhwIjoxNzA2NDk0OTY0fQ.kKiiOGQc5CNtW2-2-7z7zcA1ypxnWnc64TUzdqt3u_I'
```

## PUT `/documents/:uuid`

Atualiza o documento com o `uuid` informado. Utiliza os mesmo parâmetros e retornos da rota de criação(POST `/documents`)

### Exemplo de requisição

```
curl --location --request PUT 'http://localhost:3000/documents/dcdcaef4-d8bc-433e-9bd0-1109bd290cd7' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWI2ZWU0Y2NhZjExODU5NmYyYmY3YmIiLCJ1c2VybmFtZSI6InJ1YmVucyIsImlhdCI6MTcwNjQ5MTM2NCwiZXhwIjoxNzA2NDk0OTY0fQ.kKiiOGQc5CNtW2-2-7z7zcA1ypxnWnc64TUzdqt3u_I' \
--form 'file=@"/C:/Users/rgsru/Downloads/cv_info_eng_20231020.pdf"' \
--form 'digest="be1f759fbbcc187aa9be707ea6d0b6b32bc2b2817320dcdb89957a3c8e4080df"' \
--form 'name="test2_update4.pdf"' \
--form 'categories="categoria1"' \
--form 'categories="categoria4"'
```
