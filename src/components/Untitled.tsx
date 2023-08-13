'use client';
import NProgress from 'nprogress';


export function StartLoader() { NProgress.start(); };
export function StopLoader() { NProgress.done(); };