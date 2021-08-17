
# Excel Clone

It is a Microsoft Excel clone having some basic functionalities. It is made for learning purpose. I have tried to make the UI as similar to that of original Microsoft Excel. The project is made with pure HTML CSS and JavaScript.





## Screenshots

![App Screenshot](clonePic.png?text=App+Screenshot+Here)

  
## Functionalities

1. Menu

 a) Download: To download the spreadsheet in the JSON format.

 b) Open: To open a downloaded spreadsheet.

 c) New: To open a new spreadsheet.

 d) Font Decoration: Different font-families can be chosen, font size can be increased or decreased by selecting the desired font size from the select tag , the font can be made bold, italic and underline, the cell can have a full-border or one-sided border with the border option, the cells can be colored with color-fill option, the text is by default left aligned but the alignment can be changed with the help of alignment buttons. 

2. Formula

 a)Address Bar: Display the address of the current chosen cell.

 b) Formula Bar: Used to apply formulas to the cell, select the cell you want to apply the formula to then type the formula in the formula-bar using the brackets (to avoid any calculation error in case of big formulas), the corresponding cell would have the result once you pressed the enter. The formula can also be entered from the cell itself by first writing ‘=’ in the cell. The formula comes with a cycle-detection functionality, hence shows error if any cycle is detected in the formula, in that case the cell would retrieve its old entered value to avoid NAN. Inflix evaluation is used to calculate the formula.

3. Grid

 a) The grid only consists of 26 columns and 100 rows by keeping the memory limitation in mind.

 b) The grid is purely made from JavaScript and no hard coding has been done on it.

 c) The top most and left most row and column remain intact through every scroll in order to make the user at ease and avoid the hassle to scroll up to check the column and row number time to time.

 d) The corresponding row and column get highlighted every time a cell is clicked for better user experience.

 e) The number column and alphabet row also flash a green color while hovering, a small functionality given by excel.

4. Sheet

 a) Add: The ‘+’ button is used to add as many sheets to the UI as the user wants.

 b) Toggle: Sheets can be toggled once made. The active sheet is displayed by white.