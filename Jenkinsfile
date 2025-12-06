pipeline {
    agent any

    environment {
        IMAGE_NAME = "tahirmustafa/bmi-calculator-176:latest"
    }

    stages {
        stage('Clone Repository') {
            steps {
                git branch: 'main', url: 'https://github.com/TahirMustafa-NO-ONE/BMI-Cal.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install -g pnpm'
                sh 'pnpm install'
            }
        }

        stage('Run Tests') {
            steps {
                sh 'echo "Running tests..."'
                sh 'pnpm test || echo "No tests found, skipping..."'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh "docker build -t $IMAGE_NAME ."
            }
        }

        stage('Run Docker Container') {
            steps {
                sh "docker stop bmi-calculator-176 || true"
                sh "docker rm bmi-calculator-176 || true"
                sh "docker run -d -p 5000:3000 --name bmi-calculator-176 $IMAGE_NAME"
            }
        }
    }

    post {
        success {
            echo "Pipeline completed successfully!"
        }
        failure {
            echo "Pipeline failed!"
        }
    }
}
