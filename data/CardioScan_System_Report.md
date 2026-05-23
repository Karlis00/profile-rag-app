# CardioScan: AI-based ECG Heart Disease Classifier

**Prepared by:** Kam Hung Chan (200601463)  
**Institution:** Georgian College, AIDI 1011 - AI Project  
**Instructor:** Sanjeev Kumar  
**Date:** April 14, 2026  

---

## A. Problem Statement
ECG interpretation is a complex, time-consuming task requiring specialized clinical expertise. A shortage of cardiology professionals in clinics and ambulance services makes manual reviews of all recordings challenging and prone to inconsistency. There is a growing need for an automated system to assist clinicians by identifying abnormal patterns for faster, reliable screening .

### 1. Scope
*   **Dataset**: Utilizes the PTB-XL dataset with over 20,000 12-lead ECG recordings .
*   **Functionality**: Analyzes signals to detect abnormal patterns and performs multiclass heart disease classification .
*   **Purpose**: Acts as a decision-support tool for pre-diagnosis and prioritization .

### 2. Exclusions / Boundaries
*   Not for real-time diagnosis or clinical use; does not provide treatment recommendations .
*   Will not replace clinician judgment; focus is on offline research and education .

---

## B. Objectives

### 1. General Objectives
Develop CardioScan, an AI-based system, to automatically identify and classify abnormal heart patterns in 12-lead ECG signals to support healthcare professionals in expertise-limited environments .

### 2. Specific Objectives
*   **Robust Classification**: Build and train models to accurately categorize signals into clinically relevant conditions .
*   **Effective Preprocessing**: Implement normalization, noise reduction, and segmentation .
*   **Address Class Imbalance**: Apply techniques like undersampling or weighted loss functions .
*   **Performance Evaluation**: Assess using accuracy, precision, F1-score, and recall (priority) .
*   **User Interface**: Design a visualization interface for data upload and interpretation .

---

## C. Methodology

### 1. Project Planning
*   **Methodology**: Agile development with 14 weekly sprints .
*   **Tools**: Jira for tracking and GitHub for version control .
*   **Parallel Development**: Three different models (CNN, ResNet, Mamba) were developed simultaneously to compare performance .
*   **Timeline Highlights**: 
    *   Weeks 2–5: Planning and research .
    *   Weeks 6–10: Model development and selection .
    *   Weeks 10–12: App development (React/FastAPI) .

### 2. System Analysis
*   **Target Users**: Clinicians and staff without specialized cardiology expertise .
*   **Functional Requirements**:
    *   **Frontend**: File upload (.dat, .hea), 12-lead visualization, and result display .
    *   **Backend**: Preprocessing (normalization/resampling), model loading, and inference .
*   **Non-Functional Requirements**:
    *   **Performance**: Inference within 1–3 seconds .
    *   **Accuracy**: Target ≥ 80% with high recall .

### 3. System Design
*   **Architecture**: Modular client-server (Frontend, Backend, AI Module) .
*   **AI Module**: Multi-model strategy (CNN, ResNet, and Hybrid CNN+Mamba) .
*   **Data Flow**: Upload → Preprocessing → Model Inference → UI Visualization .

### 4. System Implementation
*   **Environment**: Python (PyTorch, TensorFlow), FastAPI, and React .
*   **Hardware**: CPU-based system used for all training and testing .
*   **Model Details**: 
    *   **CNN**: Josiah's four 1D convolutional layers for local features .
    *   **ResNet**: Jay's residual architecture to mitigate vanishing gradients .
    *   **Hybrid Mamba**: Kam's architecture combining CNN for local features and Mamba for long-range dependencies .

### 5. System Testing
*   **Strategy**: Unit, Integration, Model, and End-to-End testing .
*   **Results**: The Mamba-based model achieved the best recall and F1-score .
*   **Latency**: Average response time met the 1–3 second requirement .

### 6. Acceptance, Installation, and Deployment
*   **Acceptance**: Confirmed via end-to-end testing with high recall for abnormalities .
*   **Deployment**: Prototype-level web app for local demonstration; cloud-ready architecture .

---

## D. Required Tools
*   **Languages**: Python .
*   **Frameworks**: PyTorch, FastAPI, React .
*   **Management**: Jira, GitHub .

---

## E. Literature Review Summary
*    Śmigiel et al. (2021) improved PTB-XL accuracy to 76.5% for 5 classes using CNN with entropy features .
*   Atwa et al. (2025) achieved 97.78% binary accuracy using dual-branch CNNs .
*   Kachuee et al. and Strodthoff et al. demonstrated deep residual and inception-style networks for robust ECG modeling .

---

## F. Deliverables
*   Jupyter Notebook (Preprocessing/Training) .
*   Backend (FastAPI) source code .
*   Frontend (React) source code .

---

## G. References
*   Wagner et al. (2020). PTB-XL, a large publicly available electrocardiography dataset .
*   Śmigiel et al. (2021). Deep learning methods for ECG classification using the PTB-XL dataset .
*   Strodthoff et al. (2021). Deep learning for ECG analysis: Benchmarks and insights from PTB-XL .

