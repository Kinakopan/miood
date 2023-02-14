import styles from '@/styles/Home.module.css'
import { Inter } from '@next/font/google'
import { prisma } from '@/server/db/client'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Head from 'next/head'
import Weather from '@/pages/api/weather.js';
import UserName from '@/component/UserName.js';

export default function Home({posts}) {

  // Get Today's Date
  var today = new Date();
  const month = today.toLocaleString('default', { month: 'long' });
  const day = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][today.getDay()]

  today = today.getFullYear() + ' ' + month + ' ' + String(today.getDate()) + ' ' + day;

  // Save the title and content into the server
  const apiKey = "4551243115444ba0a100a9567cd1b61d"
  const url = `https://newsapi.org/v2/everything?q=tesla&from=2022-12-17&sortBy=publishedAt&apiKey=${apiKey}`
  console.log(url);
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const handleSubmit = async (e) => {
    e.preventDefault()
    const res = await axios.post('/api/posts', { title, content })
    console.log(res.data)
  }

  return (
    <div
      className={`${styles.wrapper} ${styles.wrapper_home}`}
      >
      <Head>
        <title>Your Diary</title>
        <meta name="description" content="A diary app that you can write everyday event" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={styles.wrapper_main}>
          <h1 className={styles.ttl_page}><UserName /> Diary</h1>

          <form
            className={styles.form}
            onSubmit={handleSubmit}
            >

            <div
              className={styles.container_diaryHead}
              >
              <input
                type="text"
                value={title}
                className={styles.ttl_diaryTitle}
                placeholder="Entry Title"
                onChange={(e) => setTitle(e.target.value)}
              />

              <div className={styles.box_date_weather}>
                <p class={styles.date}>{today}</p>
                <Weather></Weather>
              </div>

            </div>

            <textarea
              value={content}
              className={styles.textarea_diaryContent}
              placeholder="Write about your day"
              onChange={(e) => setContent(e.target.value)}
            />

            <button
              className={`${styles.btn} ${styles.btn_diarySubmit}`}
              type="submit">Submit</button>
          </form>
        </div>
      </main>
    </div>
  )
}

export async function getServerSideProps() {
  const posts = await prisma.post.findMany()

  return {
    props: {
      posts: JSON.parse(JSON.stringify(posts)),
    }
  }
}

export function MyPosts() {
  return (
    <div>
      {posts.map((post) => (
        <div key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
        </div>
      ))}
    </div>
  )
}
