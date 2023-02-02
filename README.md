# ft_transcendence_42

ft_transcendence from 42 school is the last project of the common core

## Documentation

### NESTJS

- [Video Nest JS Course for beginners](https://www.youtube.com/watch?v=GHTA143_b-s&ab_channel=freeCodeCamp.org)
- [NestJS official documentation](https://docs.nestjs.com/)
- [Better understanding for modules](https://dev.to/webeleon/cursus-nestjs-les-modules-partie-1-4295)
- [Better understanding for controllers](https://dev.to/webeleon/cursus-nestjs-les-controllers-4bm0)
- [How works @inject with providers](https://www.youtube.com/watch?v=_7dwRW1cgyU&ab_channel=TechWall)
- [How works the words "super" in a constructor](https://www.w3schools.com/jsref/jsref_class_super.asp)
- [How works the pipes](https://docs.nestjs.com/pipes)
- [Migration database](https://www.prisma.io/docs/concepts/components/prisma-migrate/migrate-development-production)
- [JSON web token](https://auth0.com/learn/json-web-tokens)
- [Undestand an payload in an API](https://blog.hubspot.com/website/what-is-payload#:~:text=What%20is%20a%20Payload%20in%20an%20API%3F,HTTP%20request%20and%20response%20message.)
- [Understand what is a promise](https://javascript.developpez.com/actu/146280/Comprendre-les-Promises-en-JavaScript-TypeScript-article-de-yahiko/)
- [Know more about guards](https://docs.nestjs.com/guards)
- [Automated tests: the test pyramid](https://martinfowler.com/articles/practical-test-pyramid.html)
- [Tool to automate test : Pactum](https://pactumjs.github.io/introduction/quick-start.html#system-requirements)
- [Documentation about testing](https://docs.nestjs.com/fundamentals/testing)
- [How to Architect a full stack application](https://www.freecodecamp.org/news/how-to-build-a-full-stack-application-from-start-to-finish/)

### HTML/CSS DOCUMENTATION

- [Extension: visualize your local page in your vscode](https://marketplace.visualstudio.com/items?itemName=ms-vscode.live-server)
- [Site to resize an image](https://www.resizepixel.com/fr/resize-image/)
- [Font library](https://www.fontsquirrel.com/)
- [Align-self command CSS](https://www.google.com/search?q=align+self+stretch+css&sxsrf=ALiCzsYROPioJbIHOecftLakHPbUVHz3Fw:1670837149859&source=lnms&tbm=vid&sa=X&ved=2ahUKEwjxzK224fP7AhWqTKQEHdcoDW4Q_AUoAnoECAIQBA&biw=1422&bih=1448&dpr=0.9#fpstate=ive&vld=cid:3efa47a4,vid:6yzqhpxKh3E)

### TYPESCRIPT - REACT DOCUMENTATION

- [Tutorial video for Typescript and React by doing a project](https://www.youtube.com/watch?v=FJDVKeh7RJI&ab_channel=freeCodeCamp.org)
- [Typescript types explanations](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html)

#### modules

A module is a class annotated with a @Module() decorator. The @Module() decorator provides metadata that Nest makes use of to organize the application structure. Each application has at least one module, a root module. The root module is the starting point Nest uses to build the application graph - the internal data structure Nest uses to resolve module and provider relationships and dependencies.

##### CSS useful tips

- Responsive:

```c
	//use the command width: auto and not a fixed size
```

- Icon on an another Icone
  If you position the div above another div (even if the div are on the same level) the div above will be seen in priority.

- Align self: auto, width: auto (when you put auto on your CSS code)

  - Auto will take the parent component you put in your HTML Code, that means it will take the Align self, width etc of your parent component ([explanations here for align self](<(https://www.google.com/search?q=align+self+stretch+css&sxsrf=ALiCzsYROPioJbIHOecftLakHPbUVHz3Fw:1670837149859&source=lnms&tbm=vid&sa=X&ved=2ahUKEwjxzK224fP7AhWqTKQEHdcoDW4Q_AUoAnoECAIQBA&biw=1422&bih=1448&dpr=0.9#fpstate=ive&vld=cid:3efa47a4,vid:6yzqhpxKh3E)>))

- Figma versus code :

  - Sometimes CSS is not working you should directly go to the main component to see

- Charte :

  - Have the same name as the component of figma
  - Same architecture of CSS as FIGMA
  - Desktop version from xxx px to 764 px.
  - Tablet/mobile version from 764 px to 375 px

-

#### REACT USEFULTIP

- ```c
  radce // Create by default a function with the name of your file
  Cmd + . // Auto import a react component selected
  span.icon // Create <span className = icon></span>"
  ```
- react-beautiful-dnd to install a library to do drag and drop

  - ````c
    npm i react-beautiful-dnd // To install the librairy```
    ````

- Using

##### Components

- Navbar
- DarkMode
- Buttons && Text

###### navbar

###### DarkMode

The darkmode is the theme "dark" you applied by clicking on the moon from the navbar
In this component we set:

- The dark/light mode by clicking
- To keep the current state by refeshing the webpage
- To take the user preference from his browser, if the user prefers to have dark mode by default, he will have the dark mode

- ###### Buttons && Text
  For the Buttons we've decided to use [Styled-components](https://styled-components.com/) which allows us to do a lot of variant of one item and to write the CSS directly in the tsx.
  There are 2 variants of our component : the primary button use for clicking "Play" for example and the secondary Button.

Syntax is pretty easy. here I declare text which is the basis of my text in my index.tsx from my component directory buttons and I add the variant with the size of the font of this component by using 'styled'

```c
import styled from 'styled-components'

export const text = styled.text`
	font-family: 'Montserrat';
	font-style: normal;
	display: flex;
	align-items: center;
	color: var(--font-color);
`;

export const H1Title = styled(text)`
	font-weight: 700;
	font-size: 40px;
	line-height: 48px;
`

export const Subtitle = styled(text)`
	font-weight: 500;
	font-size: 16px;
	line-height: 20px;
```

To import the component, you do the following in another component

````
import { H1Title, Subtitle } from 'Components/Text'

const LandingPage = () => {
  return (
	<div>
        <H1Title>FIRE PONG</H1Title>
        <Subtitle>Votre anus va finir en feu</Subtitle>
     </div>
```c

- ###### TEST
How to test on multiple devices
- Go to your package.json and change dev by ""
-
````
