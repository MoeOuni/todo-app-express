pipeline {
    agent any

    triggers {
        githubPush()
    }

    stages {
        stage('Checkout') {
            steps {
                git url: 'https://github.com/MoeOuni/todo-app-express.git', branch: 'main'
            }
        }
        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }
        stage('Run Tests') {
            steps {
                sh 'npm test'
            }
        }
        stage('Build and Deploy') {
            steps {
                // You can either deploy directly here, or use Docker commands if you are containerizing your app
                // For example, if using Docker:
                sh 'docker build -t todo-app .'
                sh 'docker run -d -p 3000:3000 todo-app'
                // Alternatively, if not using Docker, you could use process managers like PM2:
                // sh 'pm2 restart all || pm2 start index.js'
                // sh 'npm start' // Simple example for starting the app manually.
            }
        }
    }
    post {
        failure {
            echo "Deployment failed."
        }
        success {
            echo "Deployed successfully."
        }
    }
}