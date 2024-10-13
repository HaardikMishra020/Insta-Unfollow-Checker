import JSZip from 'jszip';

export const extractJSONFromZip = async (zipFile) => {
    const zip = await JSZip.loadAsync(zipFile);
    const jsonFiles = {};
  
    // Navigate through the folder structure to get the relevant JSON files
    await Promise.all(
      Object.keys(zip.files).map(async (filename) => {
        // Check for the specific folder structure
        if (filename.includes('connections/followers_and_following/') && 
            (filename.endsWith('following.json') || filename.endsWith('followers_1.json'))) {
          const fileContent = await zip.files[filename].async('string');
          jsonFiles[filename.split('/').pop()] = JSON.parse(fileContent); // Store by filename
        }
      })
    );
  
    // Debugging: Log the jsonFiles structure to verify correct extraction
    console.log('JSON Files Extracted:', jsonFiles);
  
    return jsonFiles; // Return an object containing the extracted JSON files
  };
  

export const subtractLists = (list1, list2) => {
  return list1.filter(item => !list2.includes(item));
};

export const processZipFile = async (zipFile) => {
    // Extract JSON data from the zip file
    const jsonFiles = await extractJSONFromZip(zipFile);
    
    // Debugging: Log the jsonFiles structure to see what's inside
    console.log('Extracted JSON Files:', jsonFiles);
  
    // Check if both files are present
    if (jsonFiles['following.json'] && jsonFiles['followers_1.json']) {
      const followingList = jsonFiles['following.json'].relationships_following.map(item => ({
        name: item.string_list_data[0].value,  // Assuming this is the name
        url: item.string_list_data[0].href     // Assuming this is the URL
      }));
  
      // Map names and URLs from followers_1.json
      const followersList = jsonFiles['followers_1.json'].map(item => ({
        name: item.string_list_data[0].value,  // Assuming this is the name
        url: item.string_list_data[0].href     // Assuming this is the URL
      }));
  
      // Perform the subtraction and return the result (users we follow, but they don't follow back)
      const unfollowers = followingList.filter(followingUser => {
        return !followersList.some(follower => follower.name === followingUser.name);
      });
      console.log(unfollowers);
      return unfollowers;
    } else {
      throw new Error('One or both JSON files are missing in the zip.');
    }
  };
  
