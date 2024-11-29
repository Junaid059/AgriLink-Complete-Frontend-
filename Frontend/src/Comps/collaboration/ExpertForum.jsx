import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
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

function ExpertForum() {
  const [tags, setTags] = useState([
    'study-group',
    'share-insight',
    'help-question',
  ]);
  const [newTag, setNewTag] = useState('');
  const [postContent, setPostContent] = useState('');
  const [file, setFile] = useState(null);
  const [newComment, setNewComment] = useState('');
  const [replyingTo, setReplyingTo] = useState(null);
  const [posts, setPosts] = useState([
    {
      id: 1,
      author: 'Mikey Jonah',
      avatar: '/placeholder.svg',
      title: 'Discussion Title Here',
      content:
        'That IPO will be a game-changer. Land it in the region, keep it lean. This proposal is a win-win situation, which will cause a stellar paradigm shift and produce a multi-fold increase in deliverables.',
      tags: ['study-group', 'share-insight'],
      timestamp: '2d ago',
      replies: 2,
      views: 875,
      comments: [
        {
          id: 1,
          author: 'Jane Doe',
          avatar: '/placeholder.svg',
          content: 'Great insight! I completely agree with your perspective.',
          timestamp: '1d ago',
          replies: [],
        },
        {
          id: 2,
          author: 'John Smith',
          avatar: '/placeholder.svg',
          content:
            'I have a question about this. Can you elaborate more on the paradigm shift?',
          timestamp: '1d ago',
          replies: [
            {
              id: 1,
              author: 'Mikey Jonah',
              avatar: '/placeholder.svg',
              content: 'The paradigm shift refers to...',
              timestamp: '1d ago',
            },
          ],
        },
      ],
    },
  ]);

  const handleAddTag = () => {
    if (newTag.trim() && !tags.includes(newTag)) {
      setTags([...tags, newTag]);
      setNewTag('');
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0] || null);
  };

  const handlePostSubmit = (e) => {
    e.preventDefault();
    if (postContent.trim()) {
      const newPost = {
        id: posts.length + 1,
        author: 'Current User',
        avatar: '/placeholder.svg',
        title: postContent.split('\n')[0] || 'Untitled',
        content: postContent,
        tags,
        timestamp: 'Just now',
        replies: 0,
        views: 0,
        comments: [],
      };
      setPosts([newPost, ...posts]);
      setPostContent('');
      setTags([]);
      setFile(null);
    }
  };

  const handleCommentSubmit = (e, postId) => {
    e.preventDefault();
    if (newComment.trim()) {
      setPosts(
        posts.map((post) =>
          post.id === postId
            ? {
                ...post,
                comments: [
                  ...post.comments,
                  {
                    id: post.comments.length + 1,
                    author: 'Current User',
                    avatar: '/placeholder.svg',
                    content: newComment,
                    timestamp: 'Just now',
                    replies: [],
                  },
                ],
                replies: post.replies + 1,
              }
            : post
        )
      );
      setNewComment('');
    }
  };

  const handleReplySubmit = (e, postId, commentId) => {
    e.preventDefault();
    if (newComment.trim()) {
      setPosts(
        posts.map((post) =>
          post.id === postId
            ? {
                ...post,
                comments: post.comments.map((comment) =>
                  comment.id === commentId
                    ? {
                        ...comment,
                        replies: [
                          ...comment.replies,
                          {
                            id: comment.replies.length + 1,
                            author: 'Current User',
                            avatar: '/placeholder.svg',
                            content: newComment,
                            timestamp: 'Just now',
                          },
                        ],
                      }
                    : comment
                ),
              }
            : post
        )
      );
      setNewComment('');
      setReplyingTo(null);
    }
  };

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
            <textarea
              className="w-full min-h-[120px] p-3 rounded-lg border resize-none focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Hey everyone! 👋\nShare your thoughts..."
              value={postContent}
              onChange={(e) => setPostContent(e.target.value)}
            />
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
                <div key={post.id} className="space-y-4 border-b pb-4">
                  <div className="flex space-x-4">
                    <Avatar>
                      <AvatarImage
                        src={post.avatar}
                        alt={`${post.author}'s avatar`}
                      />
                      <AvatarFallback>{post.author[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-semibold">{post.title}</h4>
                      <p className="text-gray-600">{post.content}</p>
                      <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <span>{post.timestamp}</span>
                        <span>
                          <MessageSquare className="inline-block h-4 w-4" />{' '}
                          {post.replies}
                        </span>
                        <span>
                          <Eye className="inline-block h-4 w-4" /> {post.views}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {post.tags.map((tag) => (
                          <Badge key={tag} variant="secondary">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 space-y-2">
                    {post.comments.map((comment) => (
                      <div key={comment.id} className="pl-6 border-l space-y-2">
                        <div className="flex space-x-4">
                          <Avatar>
                            <AvatarImage
                              src={comment.avatar}
                              alt={`${comment.author}'s avatar`}
                            />
                            <AvatarFallback>{comment.author[0]}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{comment.author}</p>
                            <p className="text-gray-600">{comment.content}</p>
                            <span className="text-sm text-gray-500">
                              {comment.timestamp}
                            </span>
                          </div>
                        </div>
                        {comment.replies.map((reply) => (
                          <div
                            key={reply.id}
                            className="pl-6 border-l space-y-2"
                          >
                            <div className="flex space-x-4">
                              <Avatar>
                                <AvatarImage
                                  src={reply.avatar}
                                  alt={`${reply.author}'s avatar`}
                                />
                                <AvatarFallback>
                                  {reply.author[0]}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-medium">{reply.author}</p>
                                <p className="text-gray-600">{reply.content}</p>
                                <span className="text-sm text-gray-500">
                                  {reply.timestamp}
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ))}
                    <form
                      onSubmit={(e) => handleCommentSubmit(e, post.id)}
                      className="flex items-center mt-2"
                    >
                      <Input
                        placeholder="Add a comment..."
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
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
