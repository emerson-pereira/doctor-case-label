# Doctor Case Label

Medical cases reviewer for doctors. Assign an ICD-10 condition for EHR cases.

### Instructions

- Run frontend and backend as described in the steps below

### Requirements
- node
- docker
- docker-compose

## Frontend

### 1. Go to folder

```
cd ./frontend
```

### 2. Install dependencies

```
npm i
```

### 3. Setup env vars

```
cp ./.env.development ./.env.development.local
```

### 4. Run App

```
npm start
```

## Backend

### 1. Go to folder

```
cd ./backend
```

### 2. Install dependencies

```
npm i
```

### 3. Setup env vars

```
cp ./.env.development ./.env.development.local
```

### 4. Run Mongo DB via docker

```
npm run docker:up
```

>  To stop MongoDB docker run:
>
> ```
> npm run docker:down
> ```

### 5. Populate DB with mock data

```
npm run db:populate
```

### 6. Run app

```
npm run start:dev
```
