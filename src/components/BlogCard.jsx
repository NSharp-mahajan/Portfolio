import React from 'react'
import { Calendar, Clock, Tag } from 'lucide-react'

const BlogCard = ({ blog, onReadMore }) => {
  return (
    <article className="blog-card">
      <div className="blog-image-wrapper">
        <div
          className="blog-image"
          style={{
            backgroundImage: `url(${blog.image})`
          }}
          aria-hidden="true"
        />
        <div className="blog-image-overlay" />
      </div>

      <div className="blog-content">
        <div className="blog-meta">
          <div className="blog-date">
            <Calendar size={14} strokeWidth={2} />
            <span>{blog.date}</span>
          </div>
          <div className="blog-read-time">
            <Clock size={14} strokeWidth={2} />
            <span>{blog.readTime}</span>
          </div>
        </div>

        <h3 className="blog-title">{blog.title}</h3>
        
        <p className="blog-description">{blog.preview}</p>

        <div className="blog-tags">
          <Tag size={14} strokeWidth={2} />
          <div className="tags-list">
            {blog.tags.map((tag, tagIndex) => (
              <span key={tagIndex} className="tag">
                {tag}
              </span>
            ))}
          </div>
        </div>

        <button 
          className="read-more-btn"
          onClick={() => onReadMore(blog.slug)}
        >
          Read Article →
        </button>
      </div>
    </article>
  )
}

export default BlogCard
