import styles from '@/styles/Home.module.css'
import { Inter } from '@next/font/google'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Head from 'next/head'
import MyPosts from '@/pages/index';
import UserName from '@/component/UserName.js';

// const PostList = () => <MyPosts />;
export default function PostList(){

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
          <h1 className={styles.ttl_page}>List of <UserName /> Diary</h1>

          <MyPosts />

          </div>
        </main>
      </div>
  )
}
