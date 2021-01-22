# WayAuthService

----

# Install

Install from the command line:

#### NPM
```
npm install @thehumphrey/learningpackage@1.0.6
```

#### Yarn
```
yarn add @thehumphrey/learningpackage@1.0.6
```

Install via package.json:

```
"@thehumphrey/learningpackage": "1.0.6"
```

----
# Fuctions

signInWithUsernameAndPassword(email: string, password: string);

signOut();

emailExists(email: string);

renew();

----

# Example

### Import Service and create a instance
```typescript
  import AuthWayService from '@thehumphrey/learningpackage';
  
  const MyComponent = (): ReactElement => {
    const myUrl = "http://localhost:3000"
    const authService = new AuthWayService(myUrl);
    
    return <h1>Hello World<h1/>:
  }
```

### Services functions

#### Email Exist

```typescript
  const email = "teste@gmail.com";
  authService.loginExists(email).then(
    () => {
      //your code if request is ok
    }
  ).catch(
    (error) => {
      //your code if request if fail
    }
  );
```

#### Login (signInWithUsernameAndPassword)

```typescript
  const email = "teste@gmail.com"
  const password = "123"
  
  authService.signInWithUsernameAndPassword(email, password).then(
   (response) => {
      //your code if request is ok
    }
  ).catch(
    (error) => {
      //your code if request if fail
    }
 );
```

#### SignOut

```typescript
authService.signOut().then(
  () => {
      //your code if request is ok
    }
  ).catch(
    (error) => {
      //your code if request if fail
    }
);
```

#### ReNew

```typescript
authService.renew().then(
  () => {
      //your code if request is ok
    }
  ).catch(
    (error) => {
      //your code if request if fail
    }
);
```
