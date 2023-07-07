# React와 History API 사용하여 SPA Router 기능 구현하기

## 1. 요구사항

**1) 해당 주소로 진입했을 때 아래 주소에 맞는 페이지가 렌더링 되어야 한다.**

- `/` → `root` 페이지
- `/about` → `about` 페이지

**2) 버튼을 클릭하면 해당 페이지로, 뒤로 가기 버튼을 눌렀을 때 이전 페이지로 이동해야 한다.**

- 힌트) `window.onpopstate`, `window.location.pathname` History API(`pushState`)

**3) Router, Route 컴포넌트를 구현해야 하며, 형태는 아래와 같아야 한다.**

```tsx
ReactDOM.createRoot(container).render(
  <Router>
    <Route path="/" component={<Root />} />
    <Route path="/about" component={<About />} />
  </Router>
);
```

**4) 최소한의 push 기능을 가진 useRouter Hook을 작성한다.**

```tsx
const { push } = useRouter();
```

## 2. 구현 설명

1. 접근 방법
   <br>
   먼저 요구사항의 3번을 보고 `<Route>` 컴포넌트를 감싸는 `<Router>` 컴포넌트는 전역적인 context를 관장하는 컴포넌트여야 함을 확인했습니다.
   <br>

- 따라서 React의 [context API](https://react-ko.dev/learn/passing-data-deeply-with-context#context-passes-through-intermediate-components) 기능을 사용하였고,
- 힌트로 제공된 [History API](https://developer.mozilla.org/en-US/docs/Web/API/Window/popstate_event) 문서를 통해 [popstate syntax](https://developer.mozilla.org/en-US/docs/Web/API/Window/popstate_event)로는 window 객체에 EventListener를 달아 경로가 바뀔 때마다 렌더링이 일어나도록 설계해야 한다는 점,
- ['뒤로가기나 앞으로가기는 `popstate` 이벤트를 일으키지만 `history.pushState()`는 그 이벤트를 일으키지 않'](<https://developer.mozilla.org/en-US/docs/Web/API/Window/popstate_event#:~:text=Note%20that%20just%20calling%20history.pushState()%20or%20history.replaceState()%20won%27t%20trigger%20a%20popstate%20event.%20The%20popstate%20event%20will%20be%20triggered%20by%20doing%20a%20browser%20action%20such%20as%20a%20click%20on%20the%20back%20or%20forward%20button%20(or%20calling%20history.back()%20or%20history.forward()%20in%20JavaScript).>)기 떄문에 push 기능을 포함한 useRouter를 작성할 때 history stack에 push 후 수동으로 popstate 이벤트를 발생시켜야한다는 점을 확인했습니다.

2. 세부 구현
   <details><summary>RouterContext.tsx</summary><div>

   ```tsx
   import { createContext } from "react";

   interface RouterContextProps {
     location: string;
   }

   export const RouterContext = createContext<RouterContextProps>({
     location: "",
   });
   ```

   전역 location context를 관리하기 위한 Context API입니다. 초기값으로 빈 문자열을 할당하였습니다.

   </div></details>

   <details><summary>Router.tsx</summary><div>

   ```tsx
   import { useState, useEffect } from "react";
   import { RouterContext } from "../contexts/RouterContext";

   export default function Router({ children }: { children: React.ReactNode }) {
     const [location, setLocation] = useState(window.location.pathname);

     useEffect(() => {
       const onpopstate = () => setLocation(window.location.pathname);
       window.addEventListener("popstate", onpopstate);
       return () => window.removeEventListener("popstate", onpopstate);
     }, []);

     const contextValue = {
       location,
     };

     return (
       <RouterContext.Provider value={contextValue}>
         {children}
       </RouterContext.Provider>
     );
   }
   ```

   `RouterContext`의 Provider로 하위 Route 컴포넌트를 감싸 context에 접근할 수 있게 하는 `Router` 컴포넌트입니다. 현재 경로의 Pathname이 변경될 때마다 리렌더링을 촉발시켜야하기 때문에 `useState`로 관리하였으며, `useEffect`를 사용해 location이 업데이트된 이후 addEventListener를 붙여주고 컴포넌트 unmount시 remove할 수 있도록 하였습니다.

   </div></details>

   <details><summary>Route.tsx</summary><div>

   ```tsx
   import { useContext } from "react";
   import { RouterContext } from "../contexts/RouterContext";

   type RouteProps = {
     path: string;
     component: React.ReactNode;
   };
   export default function Route({ path, component }: RouteProps) {
     const { location } = useContext(RouterContext);
     return location === path ? component : null;
   }
   ```

   `Router`의 child 컴포넌트인 `Route` 컴포넌트입니다. `RouterContext`의 Context를 사용하여 props로 전달받은 경로와 현재 경로가 일치할 때만 가지고 있는 컴포넌트를 렌더링하는 방식으로 작성했습니다.

   </div></details>

   <details><summary>useRouter.tsx</summary><div>

   ```tsx
   export const useRouter = () => {
     const push = (path: string) => {
       console.log(path);
       window.history.pushState({}, "", path);
       window.dispatchEvent(new PopStateEvent("popstate"));
     };

     return { push };
   };
   ```

   `push` 기능을 제공하는 useRouter 훅입니다. `Next.js`에서의 `router.push`기능을 떠올리며 구현했으며 제공된 `history.pushState()`를 사용했고 popstate 이벤트 발생을 위해 별도의 `dispatchEvent()` 메소드를 사용했습니다.
   <br>
   About/Root 컴포넌트의 버튼을 누를 때 useRouter의 `push` 메소드가 작동하여 history 스택에 새로운 경로를 push하고 dispatchEvent를 통해 popstate를 인위적으로 발생시킵니다. 그럼 Router 컴포넌트에서 add된 `EventListener`가 popstate를 감지해 onpopstate 콜백함수를 작동시키고 리렌더링이 일어나 올바른 페이지를 사용자에게 보여주게 됩니다.

   </div></details>
