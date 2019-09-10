/* @flow */
import { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { render } from 'react-dom';

// no named imports from lodash
import { chunk } from 'lodash';

// Flow type declaration should be allowed
type ReactElement = { type: string, props: Object };
type PropTypesViaFlowTypes = {
  // react/no-unused-prop-types
  text?: ?string,
};

type BlockProps = {
  // babel/flow-object-type
  hello: string;
  // react/no-unused-prop-types
  world: string,
};

// arrow-body-style
const parens = args => {
  // react/react-in-jsx-scope
  return <div>{args}</div>;
};
parens.displayName = 'Parens';

// no-unused-vars
// react/no-multi-comp
const Unused = (props: PropTypesViaFlowTypes) => {
  parens();
  // react/react-in-jsx-scope
  // react/prop-types
  return <h1>{`It works ${props.texas}`}</h1>;
};

// react/no-multi-comp
// no-undef
class Block extends React.Component {
  props: BlockProps;

  // arrow-parens
  // no-empty-function
  // no-unused-vars
  onClick = (e) => {
  }

  render() {
    // react/react-in-jsx-scope
    // jsx-a11y/onclick-has-role
    // react/jsx-quotes
    // react/jsx-handler-names
    return (
      <div className="as" onClick={this.onClick} tabIndex={-1}>
        {this.props.hello}
      </div>
    );
  }
}

// no-var
var text: string = 'random';
text += 'a';

// prefer-const
let x: Object = {
  // babel/object-shorthand
  // comma-dangle
  text: text
};

const { text: myText, ...rest } = x;

x.run(
  // prefer-arrow-callback
  // func-names
  function (req: Object, res: Object, next: () => void): ReactElement {
    // - react/react-in-jsx-scope
    render(<Block hello={myText} {...rest} next={next} />);
  },
  cb => {
    // curly
    if (x) x.run();

    return cb();
  },
  async (err, cb) => {
    !err && cb();
  }
);

// no-console
// quotes
// prefer-template
// semi
console.log("testing" + x.text + 'asd')

function Bar(props) {
  if (props.baz) {
    // no conditional hooks (react-hooks/rules-of-hooks)
    useState(false);
  }

  // warn missing deps (react-hooks/exhaustive-deps)
  useEffect(() => void props.foo, []);
}

// react-native/no-unused-styles
function UnusedStyle() {
  return (
    <View style={Style.container}>
      <Text>{'test'}</Text>
    </View>
  )
}

const Style = StyleSheet.create({
  container: {
    width: 100,
  },
  text: {
    color: 'blue',
  }
});
