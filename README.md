# 10k Rows Display with React

This project is a **React + Vite** application that demonstrates a virtualized, editable, and paginated data table with upload/download functionality.

## Features

- **Virtualized Table Rendering** using [`react-virtuoso`](https://virtuoso.dev/) for smooth scrolling of large datasets.
- **Fake Data Generation** with [`@faker-js/faker`](https://github.com/faker-js/faker).
- **Excel Import/Export** using [`xlsx`](https://www.npmjs.com/package/xlsx).
- **Inline Editing** (double-click any cell to edit).
- **Filtering** with debounced search.
- **Pagination** with customizable page size.
- **Upload / Download / Reset** controls to manage data.

## Tech Stack

- [React 19](https://react.dev/)  
- [Vite](https://vitejs.dev/) for fast development & build  
- [react-virtuoso](https://virtuoso.dev/) for virtualized tables  
- [@faker-js/faker](https://fakerjs.dev/) for generating random book data  
- [xlsx](https://github.com/SheetJS/sheetjs) for reading/writing Excel files  
- [ESLint](https://eslint.org/) for linting  

## Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run ESLint
npm run lint
