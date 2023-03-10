# JavaScript File Downloader

JavaScript File Downloader is an open-source library that allows you to download files from a given URL in JavaScript. This library can be used with any JavaScript framework.

## Getting Started

### Prerequisites

- A web browser that supports ECMAScript 6 (ES6)

## Installation

To use JavaScript File Downloader in your project, you can download the jsFileDownloader.js file and include it in your project. Alternatively, you can install it using npm:

```bash
npm install file-downloader--js
```

```bash
yarn add file-downloader--js
```

## Importing

```
import jsFileDownloader from 'file-downloader--js';

```

## How to use it in your project

#### use this function in click event or any event

```javascript
jsFileDownloader(url, fileName);
```

### if you want to see the progress of the download, you can pass a function as the third parameter

```javascript
jsFileDownloader(url, fileName, (progress) => {
  console.log(progress);
});
```

### if you want to use it with async/await

```javascript
try {
  const response = await jsFileDownloader(url, name, (progress) => {
    console.log(progress);
  });
  console.log(response);
} catch (error) {
  console.log(error);
}
```

### if you want to use it with promise

```javascript
jsFileDownloader(url, name, (progress) => {
  console.log(progress);
})
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.log(error);
  });
```

## Parameters

| Parameter | Type             | Description                                               |
| --------- | ---------------- | --------------------------------------------------------- |
| url\*     | string(required) | The URL of the file to be downloaded                      |
| fileName  | string           | The name with which the downloaded file will be saved     |
| progress  | function         | A function that will be called with the download progress |

## Functionality

- Tries to download a file from the given URL
- Checks if the url contains "http://" and replaces it with "https://"
- Initializes the necessary variables and arrays
- Reads the response body in chunks
- Calculates the download progress and calls the progress function with the progress value
- Combines the chunks and creates a blob URL
- Creates a link element, assigns the blob URL and file name, and clicks on it to download the file
- Revokes the blob URL

## Returns

- If successful, returns the downloaded file
- If an error occurs, returns the error message.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Author

- \*\*[Md Wahiduzzaman Emon]

## Contributing

- Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

* Please make sure to update tests as appropriate.
