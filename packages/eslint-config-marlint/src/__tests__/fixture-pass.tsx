import * as React from 'react';

function a(e) {
  e.preventDefault();
}

type Props = {
  text: string
}

export default function TestComponent(props: Props) {
  const [state, setState] = React.useState(props.text);
  return (
    <div>
      <span>{state}</span>
      <button onClick={setState("false")} />
    </div>
  )
}
