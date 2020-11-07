import React from "react";

import Error from "../components/Error";
import Layout from "../components/layout/Layout";
import SEO from "../components/layout/SEO";

interface State {}
interface Props {}

export default class NotFound extends React.Component<Props, State> {
  constructor(props: Props | Readonly<Props>) {
    super(props);
  }

  public render() {
    return (
      <Layout>
        <SEO title="404: Not found" />
        <Error code={404}>
          <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
        </Error>
      </Layout>
    );
  }
}