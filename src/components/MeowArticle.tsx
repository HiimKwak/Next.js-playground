"use client";
import styles from "./MeowArticle.module.css";
import { useState, useEffect } from "react";

export default function MeowArticle() {
  const [text, setText] = useState("data loading...");

  useEffect(() => {
    fetch("https://meowfacts.herokuapp.com")
      .then((res) => res.json())
      .then((data) => setText(data.data[0]));
  }, []);
  return <article className={styles.article}>{text}</article>;
}
