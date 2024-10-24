#!/bin/bash

# Version all files with specified extension and update HTML references

EXTENSIONS=("js" "css")   # You can add more file types if needed
VERSION=$(git rev-parse --short HEAD)          # You can automate this versioning with commit hashes, timestamps, etc.

# Loop through all specified file extensions
for EXT in "${EXTENSIONS[@]}"
do
    for FILE in $(find . -type f -name "*.$EXT"); do
        BASENAME=$(basename "$FILE")
        DIRNAME=$(dirname "$FILE")

        # Create the new versioned filename
        VERSIONED_FILENAME="${BASENAME%.*}-$VERSION.$EXT"

        # Rename the file by appending the version
        mv "$FILE" "$DIRNAME/$VERSIONED_FILENAME"

        # Replace the old filename with the new versioned filename in all HTML files
        find . -name "*.html" -exec sed -i "s/$BASENAME/$VERSIONED_FILENAME/g" {} \;

        # Replace the old filename with the new versioned filename in all JS files
        find . -name "*.js" -exec sed -i "s/$BASENAME/$VERSIONED_FILENAME/g" {} \;
    done
done