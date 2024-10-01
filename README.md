# Project Name

Brief description of your project goes here.

## Getting Started

Follow these steps to set up the project on your local machine.

### Prerequisites

- Git
- Node.js (version 18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/RabinThapa1998/giphy.git
   ```

2. Navigate to the project directory:
   ```
   cd giphy
   ```

3. Install dependencies:
   
   Using npm:
   ```
   npm install
   ```
   
   Or using yarn:
   ```
   yarn install
   ```

4. Set up environment variables:
   - Copy the `.env.example` file and rename it to `.env.development`
   - Open `.env.development` and add your GIPHY API key:
     ```
     VITE_APP_KEY=your_api_key_here
     ```

## Usage

To start the development server:

```
yarn dev
```

## Testing

### Running Unit Tests with Vitest

To run unit tests:

```
yarn test
```

### Running End-to-End Tests with Playwright

To run end-to-end tests with the Playwright UI:

```
npx playwright test --ui
```

