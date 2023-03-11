/*
Defines a function named "jsFileDownloader"
Takes in 3 parameters: "url", "fileName", and "progress"
Starts with a try and catch block
Initializes the newUrl variable
Checks if the url contains "http://" and replaces it with "https://"
Fetches the response from the url
Reads the body of the response
Gets the content length of the response
Initializes the receivedLength variable
Initializes the chunks array
Enters a loop
Reads the response body
Checks if the response is done and breaks the loop
Pushes the value of the response body in the chunks array
Increments the receivedLength variable
Initializes the progressValue variable
Checks if the progressValue is between 0 and 100
Calls the progress function
Initializes the chunksAll array
Sets the value of the chunks in the chunksAll array
Creates a blob
Creates an object URL
Creates a link element
Assigns the blobUrl to the link
Assigns the fileName to the link
Clicks on the link
Revokes the URL
Returns the response if successful
If an error occurs, catches the error and returns it.
*/

// Parameters:

// url (string): The URL of the file to be downloaded
// fileName (string): The name with which the downloaded file will be saved
// progress (function): A function that will be called with the download progress
// Functionality:

// Tries to download a file from the given URL
// Checks if the url contains "http://" and replaces it with "https://"
// Initializes the necessary variables and arrays
// Reads the response body in chunks
// Calculates the download progress and calls the progress function with the progress value
// Combines the chunks and creates a blob URL
// Creates a link element, assigns the blob URL and file name, and clicks on it to download the file
// Revokes the blob URL
// Returns:

// If successful, returns the downloaded file
// If an error occurs, returns the error message.


export const jsFileDownloader = async (url, fileName, progress) => { // Define the async function "jsFileDownloader"
  try {
    //if not rl return error with message and status 400 
    if(!url) return {message: 'URL is required', status: 400}; // Return error if url is not provided
        
      let newUrl = url; // Initialize newUrl variable
      // /if url in http convert to https.check user url is http or https
        const recentHref = window.location.href; // Get current URL
        const recentProtocol = recentHref.split('://')[0]; // Get protocol of current URL
        if (recentProtocol === 'http' && url.includes('http://')) { // Check if current protocol is http and url contains http://
            newUrl = url.replace('http://', 'http://'); // Replace http:// with https://
        }
        else if (recentProtocol === 'https' && url.includes('http://')) { // Check if current protocol is https and url contains http://
            newUrl = url.replace('http://', 'https://'); // Replace http:// with https://
        }
        else if (recentProtocol === 'http' && url.includes('https://')) { // Check if current protocol is http and url contains https://
            newUrl = url.replace('https://', 'http://'); // Replace https:// with http://
        }
        else if (recentProtocol === 'https' && url.includes('https://')) { // Check if current protocol is https and url contains https://
            newUrl = url.replace('https://', 'https://'); // Replace https:// with https://
        }else{
            return {message: 'URL is not valid', status: 400}; // Return error if url is not valid
        }
        
      const response = await fetch(newUrl); // Fetch response from url

      const reader = response.body.getReader(); // Read body of response
      const contentLength = +response.headers.get('Content-Length') || +response.headers.get('Content-length') || 0; // (2)    // Get content length of response

      let receivedLength = 0; // received that many bytes at the moment    // Initialize receivedLength variable
      const chunks = []; // array of received binary chunks (comprises the body)    // Initialize chunks array

      while (true) { // (3)    // Loop till true
          const {
              done,
              value
          } = await reader.read(); // Read response body

          if (done) { // Check if done
              break; // Break the loop
          }

          chunks.push(value); // Push the value in chunks array
          receivedLength += value.length; // Increment receivedLength variable

          const progressValue = Math.round((receivedLength / contentLength) * 100); // Initialize progress value
          if (progressValue > 0 && progressValue <= 100) { // Check if progressValue is between 0 and 100
              progress(progressValue); // Call progress function
          }

          // console.log((receivedLength / contentLength) * 100);
      }

      const chunksAll = new Uint8Array(receivedLength); // (4.1)    // Initialize chunksAll array
      let position = 0;
      for (const chunk of chunks) {
          chunksAll.set(chunk, position); // (4.2)    // Set value of chunks in chunksAll array
          position += chunk.length;
      }

      //any type of file can be downloaded
      const blob = new Blob([chunksAll], {
          type: response.headers.get('Content-Type')
      }); // (5)    
      const blobUrl = URL.createObjectURL(blob); // Create object URL
      const link = document.createElement('a'); // Create link element
      link.href = blobUrl; // Assign blobUrl to link
      link.download = fileName; // Assign fileName to link
      link.click(); // Click on link
      URL.revokeObjectURL(blobUrl); // Revoke URL
      // if success return status 200
      return response; // Return response if success
  } catch (error) { // Catch error if occurred
      // console.log(error);
      return error; // Return error
  }

}