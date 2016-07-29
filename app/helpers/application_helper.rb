require 'redcarpet'

module ApplicationHelper
  def render_markdown(text)
    return "" if text.blank?
    markdown = Redcarpet::Markdown.new(Redcarpet::Render::HTML, autolink: true, tables: true, quote: true)
    rendered_markdown = markdown.render(text)
    raw rendered_markdown.gsub("<q>", "<blockquote>").gsub("</q>", "</blockquote>")
  end
end
