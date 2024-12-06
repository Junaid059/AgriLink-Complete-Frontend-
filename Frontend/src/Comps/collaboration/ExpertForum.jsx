import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import axios from 'axios';
import {
  Search,
  X,
  Smile,
  Image as ImageIcon,
  Paperclip,
  MessageSquare,
  Eye,
  Send,
} from 'lucide-react';
import Footer from '../Footer';
const API_BASE_URL = 'http://localhost:3000/api/discussions';
const TEMP_USER_ID = '674dd1c19a4dbfe260f137ed';

function ExpertForum() {
  const [tags, setTags] = useState([
    'study-group',
    'share-insight',
    'help-question',
  ]);
  const [newTag, setNewTag] = useState('');
  const [postTitle, setPostTitle] = useState('');
  const [postDescription, setPostDescription] = useState('');
  const [file, setFile] = useState(null);
  const [commentInputs, setCommentInputs] = useState({});
  const [replyingTo, setReplyingTo] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get(API_BASE_URL);
      setPosts(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching posts:', error);
      setError('Failed to load posts');
      setLoading(false);
    }
  };

  const handleAddTag = () => {
    if (newTag.trim() && !tags.includes(newTag)) {
      setTags([...tags, newTag]);
      setNewTag('');
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0] || null);
  };

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    if (postTitle.trim() && postDescription.trim()) {
      try {
        const postData = {
          title: postTitle.trim(),
          description: postDescription.trim(),
          status: 'active',
          author: TEMP_USER_ID
        };

        const response = await axios.post(API_BASE_URL, postData);
        setPosts([response.data, ...posts]);
        setPostTitle('');
        setPostDescription('');
        setTags([]);
        setFile(null);
      } catch (error) {
        console.error('Error creating post:', error);
        alert('Failed to create post');
      }
    }
  };

  const handleCommentInputChange = (forumId, value) => {
    setCommentInputs(prev => ({
      ...prev,
      [forumId]: value
    }));
  };

  const handleCommentSubmit = async (e, forumId) => {
    e.preventDefault();
    const commentText = commentInputs[forumId];
    if (commentText?.trim()) {
      try {
        const commentData = {
          author: TEMP_USER_ID,
          content: commentText.trim()
        };

        console.log('Sending request to:', `${API_BASE_URL}/${forumId}/posts`);
        console.log('With data:', JSON.stringify(commentData, null, 2));

        const response = await axios.post(
          `${API_BASE_URL}/${forumId}/posts`,
          commentData
        );

        setPosts(
          posts.map((post) =>
            post._id === forumId
              ? response.data
              : post
          )
        );
        setCommentInputs(prev => ({
          ...prev,
          [forumId]: ''
        }));
      } catch (error) {
        console.error('Error details:', error.response?.data);
        console.error('Error status:', error.response?.status);
        alert(`Failed to add comment: ${error.response?.data?.message || error.message}`);
      }
    }
  };

  const handleReplySubmit = async (e, forumId, postId) => {
    e.preventDefault();
    const replyText = commentInputs[`${forumId}-${postId}`];
    if (replyText?.trim()) {
      try {
        const replyData = {
          postId,
          author: TEMP_USER_ID,
          content: replyText.trim()
        };

        const response = await axios.post(
          `${API_BASE_URL}/${forumId}/posts/${postId}/comments`,
          replyData
        );

        setPosts(
          posts.map((post) =>
            post._id === forumId
              ? response.data
              : post
          )
        );
        setCommentInputs(prev => ({
          ...prev,
          [`${forumId}-${postId}`]: ''
        }));
        setReplyingTo(null);
      } catch (error) {
        console.error('Error adding reply:', error);
        alert('Failed to add reply');
      }
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <Card className="max-w-3xl mx-auto">
        <CardHeader className="flex justify-between items-center pb-4">
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarImage src="/placeholder.svg" alt="User avatar" />
              <AvatarFallback>CC</AvatarFallback>
            </Avatar>
            <h2 className="text-xl font-semibold">Community</h2>
          </div>
          <div className="flex space-x-2">
            <Button variant="ghost" size="icon">
              <Search className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <X className="h-5 w-5" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handlePostSubmit} className="space-y-4">
            <div className="space-y-2">
              <Input
                type="text"
                placeholder="Discussion Title"
                value={postTitle}
                onChange={(e) => setPostTitle(e.target.value)}
                className="w-full"
              />
              <textarea
                className="w-full min-h-[120px] p-3 rounded-lg border resize-none focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Write your discussion description here..."
                value={postDescription}
                onChange={(e) => setPostDescription(e.target.value)}
              />
            </div>
            <div className="flex flex-wrap gap-2 items-center">
              {tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
              <Input
                type="text"
                placeholder="Add a tag"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                className="w-24 h-8"
              />
              <Button
                type="button"
                onClick={handleAddTag}
                variant="outline"
                className="text-green-600 border-green-600 h-8"
              >
                + Add Tag
              </Button>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex space-x-2">
                <Button variant="ghost" size="icon">
                  <Smile className="h-5 w-5" />
                </Button>
                <label htmlFor="file-upload" className="cursor-pointer">
                  <Button variant="ghost" size="icon">
                    <ImageIcon className="h-5 w-5" />
                  </Button>
                </label>
                <input
                  id="file-upload"
                  type="file"
                  className="hidden"
                  onChange={handleFileChange}
                />
                <Button variant="ghost" size="icon">
                  <Paperclip className="h-5 w-5" />
                </Button>
              </div>
              <Button
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                Post
              </Button>
            </div>
          </form>

          <Tabs defaultValue="post" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="post">Post</TabsTrigger>
              <TabsTrigger value="discussion">Discussion</TabsTrigger>
              <TabsTrigger value="resources">Resources</TabsTrigger>
              <TabsTrigger value="announcements">Announcements</TabsTrigger>
            </TabsList>
            <TabsContent value="post">
              {posts.map((post) => (
                <div key={post._id} className="space-y-4 border-b pb-4">
                  <div className="flex space-x-4">
                    <Avatar>
                      <AvatarImage
                        src="/placeholder.svg"
                        alt="User avatar"
                      />
                      <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-semibold">{post.title}</h4>
                      <p className="text-gray-600">{post.description}</p>
                      <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                        <span>
                          <MessageSquare className="inline-block h-4 w-4" />{' '}
                          {post.posts?.length || 0}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 space-y-2">
                    {post.posts?.map((comment) => (
                      <div key={comment._id} className="pl-6 border-l space-y-2">
                        <div className="flex space-x-4">
                          <Avatar>
                            <AvatarImage
                              src="/placeholder.svg"
                              alt="User avatar"
                            />
                            <AvatarFallback>U</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">User</p>
                            <p className="text-gray-600">{comment.content}</p>
                            <span className="text-sm text-gray-500">
                              {new Date(comment.createdAt).toLocaleDateString()}
                            </span>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setReplyingTo(comment._id)}
                              className="text-sm text-gray-500"
                            >
                              Reply
                            </Button>
                          </div>
                        </div>
                        {comment.comments?.map((reply) => (
                          <div
                            key={reply._id}
                            className="pl-6 border-l space-y-2"
                          >
                            <div className="flex space-x-4">
                              <Avatar>
                                <AvatarImage
                                  src="/placeholder.svg"
                                  alt="User avatar"
                                />
                                <AvatarFallback>U</AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-medium">User</p>
                                <p className="text-gray-600">{reply.content}</p>
                                <span className="text-sm text-gray-500">
                                  {new Date(reply.createdAt).toLocaleDateString()}
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                        {replyingTo === comment._id && (
                          <form
                            onSubmit={(e) => handleReplySubmit(e, post._id, comment._id)}
                            className="flex items-center mt-2 pl-6"
                          >
                            <Input
                              placeholder="Write a reply..."
                              value={commentInputs[`${post._id}-${comment._id}`] || ''}
                              onChange={(e) => 
                                handleCommentInputChange(`${post._id}-${comment._id}`, e.target.value)
                              }
                              className="w-full"
                            />
                            <Button type="submit" variant="ghost">
                              <Send className="h-5 w-5" />
                            </Button>
                          </form>
                        )}
                      </div>
                    ))}
                    <form
                      onSubmit={(e) => handleCommentSubmit(e, post._id)}
                      className="flex items-center mt-2"
                    >
                      <Input
                        placeholder="Add a comment..."
                        value={commentInputs[post._id] || ''}
                        onChange={(e) => handleCommentInputChange(post._id, e.target.value)}
                        className="w-full"
                      />
                      <Button type="submit" variant="ghost">
                        <Send className="h-5 w-5" />
                      </Button>
                    </form>
                  </div>
                </div>
              ))}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      <Footer />
    </>
  );
}

export default ExpertForum;

