![Image](https://i.hizliresim.com/pkqytax.png)
# PlantUML Editor

This Project is a PlantUML editor developed by using **React** and **Monaco Editor** packages. Users can write PlantUML codes and preview them. During the editing they can zoom in ,zoom out and drag. Once the editing is complete, they can use the downloading feature. It can be downloaded with PWA feauture to be used on mobil devices.

## Demo Site
[PlantUML Editor Demo-MehmetAkcil](https://puml-canvas.mehmetakcil.com.tr)

## Features

- **Code Editing**: PlantUML code editor integrated with Monaco Editor
- **PlantUML Preview**: Live preview of PlantUML code in SVG format.
- **Zoom in / Zoom out**: Zoom in and out on the preview using the mouse wheel or buttons.
- **Drag and Drop**: Adjusting the position of the preview area by dragging.
- **Download**: Downloadable as a file after the editing is complete.
- **PWA Support**: Downloadable as an app when wanted to be used on mobil devices.
- **Error Management**: Providing feedback to the users about errors that could occur during code processing or preview loading. 

## Technologies Used

- **React**: JavaScript Library that is used to create the user interface.
- **Monaco Editor**: A powerful code editor used in Visual Studio Code.
- **PlantUML Encoder**: A utility library used to encrypt PlanUML code and to create remote preview URL.
- **Tailwind CSS**: CSS Framework used to style the interface.

## Installation

To run this project on your local device, follow the steps below:

1. Clone the repository: 
    ```bash
    git clone https://github.com/username/plantuml-editor.git
    ```
2. Navigate to the project directory:
    ```bash
    cd plantuml-editor
    ```
3. Install the required packages:
    ```bash
    npm install
    ```
4. Start the application
    ```bash
    npm run dev
    ```

## How to use

- Write or paste your PlantUML code into the code editor.
- As the code is written, an SVG image will automatically generate in the preview area.
- You can zoom in and zoom out by using **Zoom In** and **Zoom Out** buttons.
- You can adjust the location of the image by dragging it.
- When your code is complete, you can download it using the **Download** button.
- You can download it, when you want to use it as an app on your mobile device.

## Identified Problems

- In cases where the code is complicated or too big, preview delays could ocur.
- In case of invalid code inputs, SVG preview may not load.

## Developing

If you want to develop or contribute to this project:

1. Fork the project.
2. Create a branch:
    ```bash
    git checkout -b feature/ozellik-adi
    ```
3. Apply your changes and commit:
    ```bash
    git commit -m "New feature has been added"
    ```
4. Send the branch:
    ```bash
    git push origin feature/ozellik-adi
    ```
5. Open a pull request.


## Contribute 

If you want to contribute to this Project, you can follow the steps below:

-   Fork the repository.
-   Create a branch to add new features or to fix bugs
-   Do your changes in this branch
-   Commit your changes and open a pull request



## License

 This Project has been licensed with MIT. For further information, check [LICENSE](LICENSE) file. 
