require 'redcarpet'

module ApplicationHelper
  def render_markdown(text)
    return "" if text.blank?
    markdown = Redcarpet::Markdown.new(PygmentizeHTML, autolink: true, fenced_code_blocks: true, hard_wrap: true)
    rendered_markdown = markdown.render(text)
    raw rendered_markdown.gsub("<q>", "<blockquote>").gsub("</q>", "</blockquote>")
  end

  class PygmentizeHTML < Redcarpet::Render::HTML
    def initialize(extensions = {})
      super extensions.merge(link_attributes: { target: "_blank" })
    end

    def block_code(code, language)
      language = :javascript if language == "json"
      language = :bash unless language
      require 'pygmentize'
      Pygmentize.process(code, language)
    end
  end
end
