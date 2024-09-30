import { Window } from "./Windows";

export class App {
  title;
  icon;
  content;
  source;
  key;
  size;
  colour;
  constructor({
    title,
    icon,
    content,
    source = "Unknown",
    key = undefined,
    size = "normal",
    colour = null,
  }) {
    this.title = title;
    this.icon = icon;
    this.content = content;
    this.source = source;
    this.key = key;
    this.size= size;
    this.colour = colour;
  }
  getJSX() {
    return (
      <Window
        title={this.title}
        icon={this.icon}
        content={this.content}
        key={this.key}
        delID={this.key}
        size={this.size}
        colour={this.colour}
        source={this.source}
      />
    );
  }
}
