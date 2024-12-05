import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Edit,
  MessageSquare,
  Plus,
  Send,
  Trash2,
  X
} from 'lucide-react';
import { useEffect, useState } from 'react';

const BlogManagement = () => {
  const [blogs, setBlogs] = useState([]);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showComments, setShowComments] = useState({});
  const [newComment, setNewComment] = useState('');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    author: '674dd1c19a4dbfe260f137ed',
    content: '',
    tags: '',
    status: 'published',
  });

  const API_BASE = 'https://database-microservice-agrilink.onrender.com/blogs';

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await fetch(API_BASE);
      const data = await response.json();
      setBlogs(data);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const method = isEditing ? 'PUT' : 'POST';
      const url = isEditing ? `${API_BASE}/${selectedBlog._id}` : API_BASE;

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          tags: formData.tags.split(',').map((tag) => tag.trim()),
        }),
      });

      if (response.ok) {
        fetchBlogs();
        resetForm();
        setShowCreateForm(false);
      }
    } catch (error) {
      console.error('Error saving blog:', error);
    }
  };

  const handleEdit = (blog) => {
    setSelectedBlog(blog);
    setFormData({
      title: blog.title,
      author: blog.author,
      content: blog.content,
      tags: blog.tags.join(', '),
      status: blog.status,
    });
    setIsEditing(true);
    setShowCreateForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      try {
        await fetch(`${API_BASE}/${id}`, { method: 'DELETE' });
        fetchBlogs();
      } catch (error) {
        console.error('Error deleting blog:', error);
      }
    }
  };

  const handleAddComment = async (blogId) => {
    if (!newComment.trim()) return;

    try {
      await fetch(`${API_BASE}/${blogId}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          author: '6751be027f4de71db840ea69',
          content: newComment,
        }),
      });
      setNewComment('');
      fetchBlogs();
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  const handleDeleteComment = async (blogId, commentId) => {
    try {
      await fetch(`${API_BASE}/${blogId}/comments/${commentId}`, {
        method: 'DELETE',
      });
      fetchBlogs();
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      author: '674dd1c19a4dbfe260f137ed',
      content: '',
      tags: '',
      status: 'published',
    });
    setSelectedBlog(null);
    setIsEditing(false);
  };

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold">BLOG MANAGEMENT</h1>

      {/* Create Post Card */}
      <Card className="bg-white shadow-sm hover:shadow-md transition-shadow duration-200">
        <CardContent className="p-4">
          {!showCreateForm ? (
            <div
              onClick={() => setShowCreateForm(true)}
              className="flex items-center space-x-4 cursor-pointer"
            >
              <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                <Plus className="h-6 w-6 text-gray-500" />
              </div>
              <div className="flex-1">
                <div className="bg-gray-100 rounded-full py-2.5 px-4 text-gray-500 hover:bg-gray-200 transition-colors duration-200">
                  Create a new blog post...
                </div>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">
                  {isEditing ? 'Edit Blog Post' : 'Create New Blog Post'}
                </h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setShowCreateForm(false);
                    resetForm();
                  }}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              <Input
                type="text"
                placeholder="Title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                className="w-full"
              />

              <Textarea
                placeholder="What's on your mind?"
                value={formData.content}
                onChange={(e) =>
                  setFormData({ ...formData, content: e.target.value })
                }
                className="w-full min-h-[150px]"
              />

              <div className="flex items-center gap-2">
                <Input
                  type="text"
                  placeholder="Tags (comma-separated)"
                  value={formData.tags}
                  onChange={(e) =>
                    setFormData({ ...formData, tags: e.target.value })
                  }
                  className="flex-1"
                />
              </div>

              <div className="flex justify-end gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setShowCreateForm(false);
                    resetForm();
                  }}
                >
                  Cancel
                </Button>
                <Button type="submit">
                  {isEditing ? 'Update Post' : 'Post'}
                </Button>
              </div>
            </form>
          )}
        </CardContent>
      </Card>

      {/* Blog Posts */}
      <div className="space-y-6">
        {blogs.map((blog) => (
          <Card
            key={blog._id}
            className="bg-white shadow-sm hover:shadow-md transition-shadow duration-200"
          >
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold mb-1">{blog.title}</h3>
                  <p className="text-sm text-gray-500">By {blog.author}</p>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleEdit(blog)}
                    className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(blog._id)}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <p className="text-gray-700 mb-4 leading-relaxed">
                {blog.content}
              </p>

              <div className="flex flex-wrap gap-2 mb-4">
                {blog.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gray-100 text-sm rounded-full text-gray-600 hover:bg-gray-200 transition-colors duration-200"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              <div className="border-t pt-4">
                <Button
                  variant="ghost"
                  onClick={() =>
                    setShowComments({
                      ...showComments,
                      [blog._id]: !showComments[blog._id],
                    })
                  }
                  className="flex items-center gap-2 text-gray-600 hover:text-gray-800"
                >
                  <MessageSquare className="h-5 w-5" />
                  {blog.comments?.length || 0} Comments
                </Button>

                {showComments[blog._id] && (
                  <div className="mt-4 space-y-4">
                    {blog.comments?.map((comment) => (
                      <div
                        key={comment._id}
                        className="flex justify-between items-start bg-gray-50 p-4 rounded-lg"
                      >
                        <div>
                          <p className="font-medium text-sm text-gray-700">
                            {comment.author}
                          </p>
                          <p className="text-gray-600 mt-1">
                            {comment.content}
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() =>
                            handleDeleteComment(blog._id, comment._id)
                          }
                          className="text-gray-400 hover:text-red-600"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}

                    <div className="flex gap-2 mt-4">
                      <Input
                        type="text"
                        placeholder="Write a comment..."
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        className="flex-1"
                      />
                      <Button
                        onClick={() => handleAddComment(blog._id)}
                        size="icon"
                      >
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default BlogManagement;
