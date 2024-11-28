import React from "react";
import styled from "styled-components";

const ProfileContainer = styled.div`
  padding: 2rem;
  max-width: 600px;
  margin: 0 auto;
`;

const ProfileCard = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const ProfileHeader = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`;

const ProfileImage = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  margin-bottom: 1rem;
`;

const ProfileForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-weight: 600;
`;

const Input = styled.input`
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const SaveButton = styled.button`
  background: #ff7b28;
  color: white;
  border: none;
  padding: 1rem;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;

  &:hover {
    background: #e66a1f;
  }
`;

function Profile() {
  const handleSubmit = (e) => {
    e.preventDefault();
    // 프로필 업데이트 로직
  };

  return (
    <ProfileContainer>
      <ProfileCard>
        <ProfileHeader>
          <ProfileImage src="https://via.placeholder.com/150" alt="Profile" />
          <h1>사용자 프로필</h1>
        </ProfileHeader>

        <ProfileForm onSubmit={handleSubmit}>
          <FormGroup>
            <Label>이름</Label>
            <Input type="text" defaultValue="홍길동" />
          </FormGroup>

          <FormGroup>
            <Label>이메일</Label>
            <Input type="email" defaultValue="hong@example.com" />
          </FormGroup>

          <FormGroup>
            <Label>전화번호</Label>
            <Input type="tel" defaultValue="010-1234-5678" />
          </FormGroup>

          <SaveButton type="submit">저장하기</SaveButton>
        </ProfileForm>
      </ProfileCard>
    </ProfileContainer>
  );
}

export default Profile;
