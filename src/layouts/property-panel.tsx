import { type PropsWithChildren } from "react";

function PropertyPanelLayout(props: PropsWithChildren) {
  return <section id="property-panel">{props.children}</section>;
}

export default PropertyPanelLayout;
