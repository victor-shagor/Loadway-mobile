export function formatCamelCaseToTitleCase(str: string) {
    // Insert a space before all capital letters and capitalize the first letter
    const result = str.replace(/([A-Z])/g, ' $1').replace(/^./, function(char) { 
        return char.toUpperCase(); 
    });

    return result.trim();
}
