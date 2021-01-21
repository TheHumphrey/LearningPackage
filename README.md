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

# Example

### Import Service and create a instance
```typescript
  import WayAuthService from '@thehumphrey/learningpackage';
  
  const MyComponent = (): ReactElement => {
    const myUrl = "http://localhost:3000"
    const authService = new WayAuthService(myUrl);
    
    return <h1>Hello World<h1/>:
  }
```

### Services functions

#### Email Exist

```typescript
  const email = "teste@gmail.com";
  authService.loginExists(email).then(
    (response) => {
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
```
