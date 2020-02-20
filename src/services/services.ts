import axios, { AxiosError } from 'axios';
import Router from 'next/router';

export default class Services {
  baseUrl = 'https://forum-be.herokuapp.com/api/v1';
  token: string;

  constructor() {
    this.token = localStorage.getItem('token');
  }

  errHandler(err: AxiosError) {
    if (err.response?.status === 401) {
      Router.push('/login');
    } else {
      throw err;
    }
  }

  getHeader() {
    return {
      Authorization: `Bearer ${this.token}`
    };
  }

  getPath(path: string): string {
    return `${this.baseUrl}${path}`;
  }

  login(email: string, password: string) {
    return axios
      .post(this.getPath('/users/login'), {
        email,
        password
      })
      .then(response => response.data)
      .catch(this.errHandler);
  }

  register(name: string, email: string, password: string) {
    return axios
      .post(this.getPath('/users'), {
        name,
        email,
        password
      })
      .then(response => response.data)
      .catch(this.errHandler);
  }

  post(message: string) {
    return axios
      .post(
        this.getPath('/posts'),
        {
          content: message
        },
        {
          headers: this.getHeader()
        }
      )
      .then(response => response.data)
      .catch(this.errHandler);
  }

  postComment(postId: string, message: string) {
    return axios
      .post(
        this.getPath(`/posts/${postId}/comments`),
        {
          message
        },
        {
          headers: this.getHeader()
        }
      )
      .then(response => response.data)
      .catch(this.errHandler);
  }

  postSubComment(postId: string, commentId: string, message: string) {
    return axios
      .post(
        this.getPath(`/posts/${postId}/comments/${commentId}`),
        {
          message
        },
        {
          headers: this.getHeader()
        }
      )
      .then(response => response.data)
      .catch(this.errHandler);
  }

  getPostDetail(postId: string) {
    return axios
      .get(this.getPath(`/posts/${postId}`), {
        headers: this.getHeader()
      })
      .then(response => response.data)
      .catch(this.errHandler);
  }

  getComments(postId: string) {
    return axios
      .get(this.getPath(`/posts/${postId}/comments`), {
        headers: this.getHeader()
      })
      .then(response => response.data)
      .catch(this.errHandler);
  }

  getAllPost() {
    return axios
      .get(this.getPath('/posts'), {
        headers: this.getHeader()
      })
      .then(response => response.data)
      .catch(this.errHandler);
  }
  upsertCommentPoints(
    postId: string,
    commentId: string,
    type: 'increment' | 'decrement'
  ) {
    return axios
      .put(
        this.getPath(`/posts/${postId}/comments/${commentId}/points`),
        {
          type
        },
        { headers: this.getHeader() }
      )
      .then(response => response.data)
      .catch(this.errHandler);
  }

  upsertPoints(postId: string, type: 'increment' | 'decrement') {
    return axios
      .put(
        this.getPath(`/posts/${postId}/points`),
        {
          type
        },
        { headers: this.getHeader() }
      )
      .then(response => response.data)
      .catch(this.errHandler);
  }
}
