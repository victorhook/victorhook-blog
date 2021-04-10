import React from 'react'

const Aboutpage = () => {
    return (
        <div className="about">
            <div class="row">
                <h3 className="about-title">About the blog</h3>
            </div>
            <div className="row">
                <p className="readable offset-1 col-10 offset-sm-2 col-sm-8 offset-xl-3 col-xl-6">
                    This is the blog of Victor Krook.
                    I am studying Computer Science and Computer Engineering
                    and this blog aims to explore any kind of topics that I find
                    interesting.
                    <br />
                    <br />
                    Physics, philosophy, education, food and much more are topics
                    I'd like to think and write about.
                    <br />
                    <br />
                    If you have thoughts on anything or just want to contact me,
                    don't hesitate: <a href="https://mrhookv.com/contact">contact me</a>
                </p>
            </div>
        </div>
    )
}

export default Aboutpage
