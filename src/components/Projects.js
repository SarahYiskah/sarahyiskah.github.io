import React, { useEffect, useState, useCallback } from 'react';
import { createUseStyles } from 'react-jss';
import { useCommonClasses, useActiveRoute } from 'hooks'
import clsx from 'clsx';
import { Modal } from 'common';
import { PlayBox } from 'assets/icons';

const useStyles = createUseStyles(theme => ({
    container: {
        display: 'flex',
        justifyContent: 'space-between',
        // position: 'relative'
    },
    details: {
        paddingTop: '130px',
        paddingBottom: '127px'
    }
}));

const projects = [
    {
        id: 'projects.bite',
        title: 'BITE',
        subheader: 'REACT NATIVE  |  FIREBASE | ZUSTAND',
        description: "An app for turning your recipes into a personalized cookbook! Create, label, and easily find your favorites or saved recipes. Sort and manage your recipes to suit your cooking style.",
        details: [
            'Cross-Platform Compatibility: Built with React Native to ensure a smooth experience on both iOS and Android',
            'Utilized Firebase for real-time data synchronization, secure user authentication, and cloud storage',
            'Used Zustand for easy and flexible state management',
            'Combined custom CSS with react-native-ui-lib for a beautiful, user-friendly interface',
            'Implemented react-native-reanimated for smooth, interactive animations and transitions'
        ],
        background: '#D0D1D8',
        videoURL: require('../assets/videos/BiteApp.mp4'),
        imageURL: require('../assets/images/bite-app.png')
    }, {
        id: 'projects.slate',
        title: 'SLATE',
        subheader: 'REACT NATIVE  |  FIREBASE',
        description: "An app for organizing your tasks efficiently. Easily view and manage tasks due today, this week, or this month. Highlight your most important tasks and switch to a calendar view to stay on top of your schedule.",
        details: [
            'Built with React Native: The app runs seamlessly on both iOS and Android',
            'Utilized Firebase for real-time data synchronization, secure user authentication, and cloud storage',
            'Used react-native-reanimated for creating smooth animations that enhance the user experience',
            'Focused on providing a clean, user-friendly interface'
        ],
        background: '#D0D1D8',
        videoURL: require('../assets/videos/SlateApp.mp4'),
        imageURL: require('../assets/images/slate-app.png')
    }, {
        id: 'projects.point',
        title: 'Point Card',
        subheader: 'REACT |  VITE | SEGMENT | REACT NATIVE',
        description: "A debit card that gives you points for spending.",
        details: [
            'Used React and Vite for web application',
            'Used React Native to create a mobile app',
            'Used Segment to create and track user events',
        ],
        background: '#D0D1D8',
        videoURL: require('../assets/videos/PointCard.mp4'),
        imageURL: require('../assets/images/point-card.png')
    }, {
        id: 'projects.musico',
        title: 'MUSICO',
        subheader: 'HTML  |  CSS  |  Javascript',
        description: "An app made to combine friends' playlists and play songs of shared interest.",
        details: [
            'Used Firebase for live updates',
            'Used the Spotify API to authenticate users and play music',
            'Used custom CSS to create a clean UI and responsive design',
            'Progressive web app',
            'Hosted on Firebase'
        ],
        background: '#D0D1D8',
        videoURL: require('../assets/videos/Musico.mp4'),
        imageURL: require('../assets/images/musico.png')
    }, {
        id: 'projects.game_night',
        title: 'GAME NIGHT',
        subheader: 'HTML  |  CSS  |  Javascript',
        description: 'A fun, interactive, live Rummikub game with your friends online.',
        details: [
            'Used Firebase to make live connections between friends',
            'Used HTML and Javascript to create ‘drag and drop’ functionality',
            'Used mostly custom CSS to create a clean and fun design',
            'Hosted on Heroku',
        ],
        background: '#CDD4CB',
        videoURL: require('../assets/videos/GameNight.mp4'),
        imageURL: require('../assets/images/game-night.png')
    }, {
        id: 'projects.trippy',
        title: 'TRIPPY',
        subheader: 'HTML  |  CSS  |  Ruby  |  Javascript',
        description: 'A great way to plan trips with your friends.',
        details: [
            'Used JWT to build custom authentication and authorization functionality',
            'Built APIs using Ruby on Rails and the MVC pattern',
            'Used FourSquare API to make real time fetch requests',
            'Hosted on Heroku'
        ],
        background: '#EDE6CF',
        videoURL: require('../assets/videos/Trippy App.mp4'),
        imageURL: require('../assets/images/trippy.png')
    }
];

const Projects = () => {
    const classes = useStyles();
    const commonClasses = useCommonClasses();

    const { activeRoute } = useActiveRoute();
    const [showModal, setShowModal] = useState(false);

    const getVideoURL = useCallback(() => {
        if (!activeRoute.includes('projects')) {
            return projects[0].videoURL.default;
        }
        return projects.find(project => project.id === activeRoute).videoURL.default;
    }, [showModal]);

    const handleDisplayVideo = () => setShowModal(true);

    return (
        <div id="projects">
            <Modal setShowModal={setShowModal} showModal={showModal}>
                {
                    showModal &&
                    <video width="320" height="240" autoPlay controls>
                        <source src={getVideoURL()} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                }
            </Modal>
            {projects.map((project, index) => (
                <div
                    id={project.id}
                    key={project.id}
                    className={clsx(classes.container, 'scrollSection')}
                >
                    <div className={clsx(classes.details, activeRoute !== project.id ? commonClasses.unactive : '')}>
                        <p className={commonClasses.sectionTitle}>{project.title}</p>
                        <p className={commonClasses.sectionSubheader}>
                            {project.subheader}
                        </p>
                        <br /><br />
                        <p className={commonClasses.sectionDescription}>{project.description}</p>
                        <br /><br />
                        <div className={commonClasses.sectionDetails}>
                            {project.details.map((details, index) => (
                                <p key={'details' + index}>
                                    * {details}
                                </p>
                            ))}
                        </div>
                    </div>
                    <div className={commonClasses.sectionImage} id={project.id + 'Img'}>
                        <img
                            style={{ background: project.background }}
                            src={project.imageURL}
                        />
                    </div>
                    <div id={project.id + 'Action'} className={commonClasses.sectionActionContainer} onClick={handleDisplayVideo}>
                        <PlayBox />
                        <p className={commonClasses.sectionAction}>Watch Demo</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Projects;