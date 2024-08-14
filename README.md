# Frontend Setup Guide
## Prerequisites
1. Ensure the backend API is properly configured. You can find the detailed setup instructions [here](https://github.com/turingplanet/unified-api/tree/main)
2. Install Node.js 
3. Install pnpm package manager globally:
```
npm install -g pnpm
```
## Setting up the Frontend
Install dependencies:
```
pnpm install
```
Start the development server:
```
pnpm start
```
The application should now be running on http://localhost:3000 (or another port if specified).

## Testing
To run tests with coverage:
```
pnpm jest --coverage --silent
```

# Top 3 Frontend Frameworks Setup Guide

The following guide provides instructions for setting up sample projects using Angular, React, and Vue.js. Each project includes a simple counter and data binding example.

## Angular Setup

1. Install Angular CLI globally:
   ```
   npm install -g @angular/cli
   ```

2. Create a new Angular project:
   ```
   ng new angular-test
   cd angular-test
   ```

3. Replace the content of `src/app/app.component.ts` with:

   ```typescript
   import { Component } from '@angular/core';
   import { CommonModule } from '@angular/common';
   import { FormsModule } from '@angular/forms';

   @Component({
     selector: 'app-root',
     standalone: true,
     imports: [CommonModule, FormsModule],
     template: `
       <h1>Angular Counter and Data Binding Example</h1>
       <div>
         <h2>Counter: {{ count }}</h2>
         <button (click)="increment()">Increment</button>
         <button (click)="decrement()">Decrement</button>
       </div>
       <div>
         <h2>Data Binding Example</h2>
         <input [(ngModel)]="inputText" placeholder="Type something...">
         <p>You typed: {{ inputText }}</p>
       </div>
     `,
     styles: [`
     button {
       background-color: #4CAF50;
       border: none;
       color: white;
       padding: 10px 20px;
       text-align: center;
       text-decoration: none;
       display: inline-block;
       font-size: 16px;
       margin: 4px 2px;
       cursor: pointer;
       border-radius: 4px;
     }
     `]
   })
   export class AppComponent {
     count: number = 0;
     inputText: string = '';
     increment() {
       this.count++;
     }
     decrement() {
       this.count--;
     }
   }
   ```

4. Run the Angular app:
   ```
   ng serve
   ```

   The app will be available at `http://localhost:4200`.

## React Setup

1. Create a new React project:
   ```
   npx create-react-app react-test
   cd react-test
   ```

2. Replace the content of `src/App.js` with:

   ```jsx
   import React, { useState } from 'react';

   function App() {
     const [count, setCount] = useState(0);
     const [inputText, setInputText] = useState('');

     const increment = () => {
       setCount(prevCount => prevCount + 1);
     };

     const decrement = () => {
       setCount(prevCount => prevCount - 1);
     };

     const handleInputChange = (event) => {
       setInputText(event.target.value);
     };

     const buttonStyle = {
       backgroundColor: '#4CAF50',
       border: 'none',
       color: 'white',
       padding: '10px 20px',
       textAlign: 'center',
       textDecoration: 'none',
       display: 'inline-block',
       fontSize: '16px',
       margin: '4px 2px',
       cursor: 'pointer',
       borderRadius: '4px',
     };

     return (
       <div>
         <h1>React Counter and Data Binding Example</h1>
         <div>
           <h2>Counter: {count}</h2>
           <button style={buttonStyle} onClick={increment}>Increment</button>
           <button style={buttonStyle} onClick={decrement}>Decrement</button>
         </div>
         <div>
           <h2>Data Binding Example</h2>
           <input 
             value={inputText}
             onChange={handleInputChange}
             placeholder="Type something..."
           />
           <p>You typed: {inputText}</p>
         </div>
       </div>
     );
   }

   export default App;
   ```

3. Run the React app:
   ```
   npm start
   ```

   The app will be available at `http://localhost:3000`.

## Vue.js Setup

1. Install Vue CLI globally:
   ```
   npm install -g @vue/cli
   ```

2. Create a new Vue project:
   ```
   vue create vue-test
   cd vue-test
   ```

3. Replace the content of `src/App.vue` with:

   ```vue
   <template>
     <div>
       <h1>Vue Counter and Data Binding Example</h1>
       <div>
         <h2>Counter: {{ count }}</h2>
         <button @click="increment" class="button">Increment</button>
         <button @click="decrement" class="button">Decrement</button>
       </div>
       <div>
         <h2>Data Binding Example</h2>
         <input v-model="inputText" placeholder="Type something...">
         <p>You typed: {{ inputText }}</p>
       </div>
     </div>
   </template>

   <script>
   import { ref } from 'vue'

   export default {
     name: 'App',
     setup() {
       const count = ref(0)
       const inputText = ref('')

       const increment = () => {
         count.value++
       }

       const decrement = () => {
         count.value--
       }

       return {
         count,
         inputText,
         increment,
         decrement
       }
     }
   }
   </script>

   <style scoped>
   .button {
     background-color: #4CAF50;
     border: none;
     color: white;
     padding: 10px 20px;
     text-align: center;
     text-decoration: none;
     display: inline-block;
     font-size: 16px;
     margin: 4px 2px;
     cursor: pointer;
     border-radius: 4px;
   }
   </style>
   ```

4. Run the Vue app:
   ```
   npm run serve
   ```

   The app will be available at `http://localhost:8080`.

## Summary

Each of these setups creates a simple app with a counter and a text input demonstrating data binding. The styling is kept minimal for clarity.

To run each project:
- Angular: `ng serve`
- React: `npm start`
- Vue: `npm run serve`
