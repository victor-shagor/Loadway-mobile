export function formatCamelCaseToTitleCase(str: string) {
    // Insert a space before all capital letters and capitalize the first letter
    const result = str.replace(/([A-Z])/g, ' $1').replace(/^./, function(char) { 
        return char.toUpperCase(); 
    });

    return result.trim();
}


export function formatTimestamp(timestamp: any) {
    const date = new Date(timestamp);
  
    const day = String(date.getDate()).padStart(2, '0'); // Get day and ensure two digits
    const month = date.toLocaleString('en-US', { month: 'short' }); // Get the short month name
    const year = date.getFullYear(); // Get the year
  
    return `${day}, ${month} ${year}`;
  }
  
