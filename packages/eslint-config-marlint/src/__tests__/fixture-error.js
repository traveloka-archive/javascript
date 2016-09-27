/* @flow */
import { render } from 'react-dom';

// Flow type declaration should be allowed
type UnusedProps = {
  text?: ?string
};

type BlockProps = {
  hello: string;
  world: string
};

const parens = args => {
  // - arrow-body-style
  // - react/react-in-jsx-scope
  return <div>{args}</div>;
};
parens.displayName = 'Parens';

// - no-unused-vars
const Unused = (props: UnusedProps) => {
  parens();
  // - no-unused-expressions
  // - react/react-in-jsx-scope
  <h1>{`It works ${props.text}`}</h1>;
};

// - react/no-multi-comp
// - no-undef
class Block extends React.Component {
  props: BlockProps;

  // - no-empty-function
  onClick = (e) => {
  }

  render() {
    // - react/react-in-jsx-scope
    // - jsx-a11y/onclick-has-role
    // - jsx-a11y/onclick-has-focus
    // - react/jsx-quotes
    // - react/jsx-handler-names
    return (
      <div className="as" onClick={this.onClick}>
        {this.props.hello}
      </div>
    );
  }
}

// - no-var
var text: string = 'random';
text += 'a';

// - prefer-const
let x = {
  // - babel/object-shorthand
  // - comma-dangle
  text: text
};

const { text: myText, ...rest } = x;

x.run(
  // - prefer-arrow-callback
  // - func-names
  function (req, res, next) {
    // - react/react-in-jsx-scope
    render(<Block hello={myText} {...rest} />);
  },
  (cb) => {
    x.run();

    return cb();
  },
  async (err, cb) => {
    throw err;
  }
);

// - no-console
// - prefer-template
// - quotes
// - semi
console.log("testing" + x.text + 'asd')
