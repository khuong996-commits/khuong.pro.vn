import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { after, afterEach, before, test } from 'node:test';
import {
    assertFails,
    assertSucceeds,
    initializeTestEnvironment
} from '@firebase/rules-unit-testing';
import { doc, getDoc, setDoc } from 'firebase/firestore';

const rules = readFileSync(new URL('../firestore.rules', import.meta.url), 'utf8');
const projectId = 'training-hub-rules-test';

const admin = {
    uid: 'admin-uid',
    email: 'admin@example.com',
    role: 'admin'
};

const leader = {
    uid: 'leader-uid',
    email: 'leader@example.com',
    role: 'leader'
};

const newcomer = {
    uid: 'newcomer-uid',
    email: 'newcomer@example.com',
    role: 'member'
};

const outsider = {
    uid: 'outsider-uid',
    email: 'outsider@example.com',
    role: 'member'
};

let testEnv;

function authContext(user) {
    return testEnv.authenticatedContext(user.uid, {
        email: user.email,
        email_verified: true,
        firebase: { sign_in_provider: 'google.com' }
    });
}

function membership(user) {
    return {
        email: user.email,
        enabled: true,
        role: user.role,
        apps: { training: true }
    };
}

function whitelistMember(email, leaderEmail = leader.email) {
    return {
        role: 'member',
        displayName: 'Nhân sự mới',
        leaderEmail,
        addedBy: leaderEmail,
        addedAt: new Date('2026-10-06T03:00:00.000Z')
    };
}

async function seed(data) {
    await testEnv.withSecurityRulesDisabled(async (context) => {
        const db = context.firestore();
        await Promise.all(Object.entries(data).map(([path, value]) => setDoc(doc(db, path), value)));
    });
}

before(async () => {
    testEnv = await initializeTestEnvironment({
        projectId,
        firestore: { rules }
    });
});

afterEach(async () => {
    await testEnv.clearFirestore();
});

after(async () => {
    await testEnv.cleanup();
});

test('leader can whitelist only a member assigned to their own team', async () => {
    await seed({ [`web_memberships/${leader.uid}`]: membership(leader) });

    const db = authContext(leader).firestore();
    await assertSucceeds(setDoc(doc(db, `whitelist/${newcomer.email}`), whitelistMember(newcomer.email)));

    const created = await testEnv.withSecurityRulesDisabled(async (context) =>
        getDoc(doc(context.firestore(), `whitelist/${newcomer.email}`))
    );
    assert.equal(created.data().leaderEmail, leader.email);
});

test('leader cannot create another leader through the staff form', async () => {
    await seed({ [`web_memberships/${leader.uid}`]: membership(leader) });

    const db = authContext(leader).firestore();
    await assertFails(setDoc(doc(db, 'whitelist/promoted@example.com'), {
        ...whitelistMember('promoted@example.com'),
        role: 'leader'
    }));
});

test('whitelisted Google user can activate only their own member training access', async () => {
    await seed({ [`whitelist/${newcomer.email}`]: whitelistMember(newcomer.email) });

    const db = authContext(newcomer).firestore();
    await assertSucceeds(setDoc(doc(db, `web_memberships/${newcomer.uid}`), membership(newcomer)));
    await assertSucceeds(getDoc(doc(db, `whitelist/${newcomer.email}`)));
});

test('unlisted Google user cannot create a membership', async () => {
    const db = authContext(outsider).firestore();
    await assertFails(setDoc(doc(db, `web_memberships/${outsider.uid}`), membership(outsider)));
});

test('a self-activated member cannot claim the leader role', async () => {
    await seed({ [`whitelist/${newcomer.email}`]: whitelistMember(newcomer.email) });

    const db = authContext(newcomer).firestore();
    await assertFails(setDoc(doc(db, `web_memberships/${newcomer.uid}`), {
        ...membership(newcomer),
        role: 'leader'
    }));
});

test('an admin-invited leader can activate the leader role assigned in their invitation', async () => {
    await seed({
        [`whitelist/${leader.email}`]: {
            ...whitelistMember(leader.email, admin.email),
            role: 'leader',
            addedBy: admin.email
        }
    });

    const db = authContext(leader).firestore();
    await assertSucceeds(setDoc(doc(db, `web_memberships/${leader.uid}`), membership(leader)));
});
