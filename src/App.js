import { Window } from "./Windows";

export class App {
  title;
  icon;
  content;
  source;
  key;
  size;
  constructor({
    title,
    icon,
    content,
    source = "Unknown",
    key = undefined,
    size = "normal",
  }) {
    this.title = title;
    this.icon = icon;
    this.content = content;
    this.source = source;
    this.key = key;
    this.size= size
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
      />
    );
  }
}
