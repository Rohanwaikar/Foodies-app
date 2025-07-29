'use client';
import classes from "./image-picker.module.css";
import { useRef, useState } from 'react';
import Image from 'next/image';


export default function ImagePicker({ label, name }) {
    const [pickedImage, setPickedImage] = useState();
    
    const imageInput = useRef();

    function handleImagePick(event) { // Handle the click event to open the file picker
         imageInput.current.click(); // Trigger the file input click to open the file picker dialog
    }

    function handleImageChange(event) { // Handle the change event when a file is selected
        const file = event.target.files[0]; // Get the first file from the input
        if (!file) { // If no file is selected, reset the picked image
            setPickedImage(null);
            return;
        }

        const reader = new FileReader(); // Create a new FileReader instance
        reader.onload = () => { // When the file is read successfully
            setPickedImage(reader.result); // Set the picked image to the base64 string
        };
        reader.readAsDataURL(file); // Read the file as a Data URL (base64 string)
    }

  return (
    <div className={classes.picker}>
      <label htmlFor={name}>{label}</label>
      <div className={classes.controls}>
        <div className={classes.preview}>
            {!pickedImage && <p>No image picked yet!</p>}
            {pickedImage && <Image src={pickedImage} alt="Picked Image" fill/>}
        </div>
        <input
          className={classes.input}
          type="file"
          id={name}
          accept="image/png, image/jpeg"
          name={name}
          ref={imageInput}
          onChange={handleImageChange}
        />
        <button className={classes.button} type="button" onClick={handleImagePick}>Pick an Image</button>
      </div>
    </div>
  );
}
