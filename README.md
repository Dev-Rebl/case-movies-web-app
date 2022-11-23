# case-movies-web-app

## Getting Started

Start by duplicating the `.env.example` file. Rename the duplicate to `.env.local` and paste your TMDB api key after `VITE_API_KEY=`

Run the development server:
```bash
yarn dev
```

Open [ http://localhost:5173/]( http://localhost:5173/) with your browser to see the result.

Create production build:
```bash
yarn build
```

Preview production build locally:
```bash
yarn preview
```

Open [ http://localhost:4173/]( http://localhost:4173/) with your browser to see the result.


## Dependecies list

- Vite
  - Simple setup
  - Better development experience
  - Blazing fast

- Typescript
  - Improves readability 
  - Helps catch mistakes early by type system
  
- Sass
  - Makes css easier to write and maintain
  - Allows for functions, mixins etc.
  - Personal preference
  
- Redux Toolkit 
  - Less boilerplate compared to Redux
  - No Redux Thunk setup needed
  - Allows for mutability
  - Recommended by Redux team
  
- React Router (react-router-dom)
  - Go to for React routing
  - Well maintained
  
- Classnames 
  - Conditional classes made simple
  
- react-lazy-load-image-component 
  - Used for lazy loading images throught project
  - Well maintained
  
- lodash.debounce 
  - Used for search input field
  - Less hassle then creating your own
  
- lodash.isequal
  - Used in the search query `forceUpdate` function
  - Used for object comparison

- vite-plugin-svgr
  - Used for SVG imports
  
- vite-tsconfig-paths
  - used for typescript path aliases
  
-----
Design based on [this Behance project](https://www.behance.net/gallery/17973235/Prototype-and-new-concept-design-for-IMDb?tracking_source=search_projects_appreciations%7Cimdb+redesign).
## Homepage:
![Homepage](/screenshots/homepage.png)

## Detailpage:
![Detailpage](/screenshots/detailpage.png)

## Searchpage:
![Searchpage](/screenshots/searchpage.png)

## Errorpage:
![Errorpage](/screenshots/errorpage.png)
